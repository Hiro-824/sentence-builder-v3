export async function requestAiTutor(prompt: string): Promise<string> {
    const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
        throw new Error(`AI API error: ${res.status}`);
    }

    const data = await res.json();
    return data.text as string;
}