// src/app/api/webhook/github/route.ts

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-hub-signature-256");
    const event = req.headers.get("x-github-event");
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;

    // Verify GitHub Webhook HMAC SHA256 signature
    if (!webhookSecret) {
      return NextResponse.json(
        { error: "Webhook secret is not configured on this server." },
        { status: 503 }
      );
    }

    if (!signature) {
      return NextResponse.json(
        { error: "Missing x-hub-signature-256 header" },
        { status: 401 }
      );
    }

    const hmac = crypto.createHmac("sha256", webhookSecret);
    const digest = `sha256=${hmac.update(rawBody).digest("hex")}`;

    const sigBuffer = Buffer.from(signature);
    const digestBuffer = Buffer.from(digest);

    if (
      sigBuffer.length !== digestBuffer.length ||
      !crypto.timingSafeEqual(sigBuffer, digestBuffer)
    ) {
      return NextResponse.json(
        { error: "Invalid webhook signature" },
        { status: 401 }
      );
    }

    // Ping event verification from GitHub
    if (event === "ping") {
      return NextResponse.json({ message: "PONG! GitHub webhook connection verified." });
    }

    // Dynamic cache revalidation on push/content updates
    revalidateTag("projects", { expire: 0 });
    revalidateTag("experience", { expire: 0 });
    revalidateTag("academicWork", { expire: 0 });
    revalidateTag("blog", { expire: 0 });
    revalidateTag("content", { expire: 0 });

    revalidatePath("/");
    revalidatePath("/projects");
    revalidatePath("/experience");
    revalidatePath("/academic");
    revalidatePath("/blog");

    return NextResponse.json({
      revalidated: true,
      event,
      timestamp: new Date().toISOString(),
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Revalidation failed", details: message },
      { status: 500 }
    );
  }
}
