import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return new Response('Discord webhook URL not configured', { status: 500 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return new Response('Failed to send message', { status: response.status });
    }

    return new Response(JSON.stringify({ message: 'DATA_SENT' }), { status: 200 });
  } catch (error) {
    console.error('Error sending message:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
