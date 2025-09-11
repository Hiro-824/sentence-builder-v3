import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Call your AI provider here (e.g., fetch to OpenAI, etc.)
    // const aiText = await callProvider(prompt);

    // Placeholder: replace with real provider response
    const aiText = `Echo: ${prompt}`;

    return NextResponse.json({ text: aiText });
  } catch (err) {
    return NextResponse.json({ error: `AI request failed (${err})` }, { status: 500 });
  }
}