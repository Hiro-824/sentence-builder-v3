export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface AiTutorRequestOptions {
    scenarioId?: string;
    customScenario?: string;
}

export async function requestAiTutor(messages: ChatMessage[], options: AiTutorRequestOptions = {}): Promise<string> {
    const payload: Record<string, unknown> = { messages };

    if (options.scenarioId) {
        payload.scenarioId = options.scenarioId;
    }

    if (options.customScenario) {
        payload.customScenario = options.customScenario;
    }

    const res = await fetch('/api/ai-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        throw new Error(`AI API error: ${res.status}`);
    }

    const data = await res.json();
    return data.text as string;
}
