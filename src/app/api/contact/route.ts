import { NextRequest } from 'next/server';

export async function GET() {
  return new Response(JSON.stringify({ status: 'API_IS_ALIVE' }), { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error('Telegram configuration missing: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
      return new Response(JSON.stringify({ error: 'Telegram configuration missing' }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const message = `🚀 *NEW CONTACT FORM SUBMISSION*\n\n*Name:* ${data.name}\n*Message:* ${data.message}`;

    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      return new Response(JSON.stringify({ 
        error: 'Telegram API error', 
        details: errorData,
        source: 'TELEGRAM_BOT_API'
      }), { 
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ message: 'DATA_SENT' }), { status: 200 });
  } catch (error) {
    console.error('Error in contact API:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
