import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize the OpenAI client with your OpenRouter credentials
const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // System prompt with constraints for the AI tutor
    const systemPrompt = `
    Act as a friendly English tutor for a young learner.  
    Your goal is to have a simple, encouraging chat conversation.  
    For every message you send, you must follow these rules:  
    Simplicity: Use plain words and simple sentence structures.  
    Brevity: Limit your response to a maximum of 3 sentences.  
    Tone: Be warm, friendly, and human.  
    Line Breaks: Write each sentence on a new line. 
    `;

    // Build the messages array with system prompt and conversation history
    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages
    ];

    const completion = await openrouter.chat.completions.create({
      model: "openai/gpt-oss-120b:free", // Or any other model from OpenRouter
      messages: apiMessages,
    });

    const aiText = completion.choices[0].message.content;

    return NextResponse.json({ text: aiText });
  } catch (err) {
    console.log(err)
    return NextResponse.json({ error: `AI request failed (${err})` }, { status: 500 });
  }
}