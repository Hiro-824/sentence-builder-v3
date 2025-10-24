export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

export interface AiTutorRequestOptions {
    scenarioId?: string;
    customScenario?: string;
}

export interface AiTutorResponse {
    text: string;
    translation?: string;
}

export async function requestAiTutor(messages: ChatMessage[], options: AiTutorRequestOptions = {}): Promise<AiTutorResponse> {
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

    const text = typeof data?.text === 'string' ? data.text : '';
    const translation = typeof data?.translation === 'string' ? data.translation : '';

    return { text, translation };
}
