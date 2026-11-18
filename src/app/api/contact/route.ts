import { NextRequest } from "next/server";

// In-memory sliding window rate limiter: 5 requests per 60 seconds per IP
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestsMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  // Periodic eviction if map gets too large
  if (ipRequestsMap.size > 5000) {
    for (const [key, timestamps] of ipRequestsMap.entries()) {
      const valid = timestamps.filter((t) => t > windowStart);
      if (valid.length === 0) {
        ipRequestsMap.delete(key);
      } else {
        ipRequestsMap.set(key, valid);
      }
    }
  }

  const timestamps = (ipRequestsMap.get(ip) || []).filter((t) => t > windowStart);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestsMap.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  ipRequestsMap.set(ip, timestamps);
  return false;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function GET() {
  return new Response(JSON.stringify({ status: "API_IS_ALIVE" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request: NextRequest) {
  try {
    // 1. Rate limiting by IP
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");
    const clientIp = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIp || "127.0.0.1";

    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
          },
        }
      );
    }

    // 2. Request size limit check (Max 10KB)
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > 10240) {
      return new Response(
        JSON.stringify({ error: "Payload too large. Maximum size is 10KB." }),
        {
          status: 413,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 3. Body parsing and payload validation
    let data: Record<string, unknown>;
    try {
      data = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON payload" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 4. Honeypot check (anti-bot trap)
    if (data.website || data.hp) {
      // Silently accept without dispatching to Telegram
      return new Response(JSON.stringify({ message: "DATA_SENT" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const name = typeof data.name === "string" ? data.name.trim() : "";
    const message = typeof data.message === "string" ? data.message.trim() : "";
    const email = typeof data.email === "string" ? data.email.trim() : "";

    if (!name || name.length < 2 || name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Name must be between 2 and 100 characters" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (!message || message.length < 10 || message.length > 3000) {
      return new Response(
        JSON.stringify({ error: "Message must be between 10 and 3000 characters" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.length > 254 || !emailRegex.test(email)) {
        return new Response(
          JSON.stringify({ error: "Please provide a valid email address" }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // 5. Telegram Bot dispatch
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (
      !token ||
      !chatId ||
      token === "your_telegram_bot_token_here" ||
      chatId === "your_telegram_chat_id_here"
    ) {
      console.warn(
        "Telegram configuration missing or placeholder values used."
      );
      return new Response(
        JSON.stringify({ error: "Message delivery service is currently not configured." }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    let telegramText = `🚀 <b>NEW CONTACT FORM SUBMISSION</b>\n\n<b>Name:</b> ${escapeHtml(
      name
    )}\n<b>Message:</b>\n${escapeHtml(message)}`;

    if (email) {
      telegramText += `\n\n<b>Email:</b> ${escapeHtml(email)}`;
    }

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: telegramText,
          parse_mode: "HTML",
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Telegram API error:", errorData);
      return new Response(
        JSON.stringify({ error: "Failed to dispatch message to Telegram" }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ message: "DATA_SENT" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in contact API:", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
