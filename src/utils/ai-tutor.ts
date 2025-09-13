export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export async function requestAiTutor(messages: ChatMessage[]): Promise<string> {
    const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
    });

    if (!res.ok) {
        throw new Error(`AI API error: ${res.status}`);
    }

    const data = await res.json();
    return data.text as string;
}