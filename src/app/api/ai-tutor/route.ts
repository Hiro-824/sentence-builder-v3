import { NextResponse } from 'next/server';
import OpenAI from 'openai';

type TutorScenario = {
  id: string;
  title: string;
  description: string;
  aiRole: string;
  sceneSetting: string;
  conversationFocus: string[];
  followUpStyle: string;
};

type TutorMessage = {
  role: 'user' | 'assistant';
  content: string;
};

const MAX_REQUEST_BYTES = 64 * 1024;
const MAX_MESSAGES = 50;
const MAX_MESSAGE_LENGTH = 8_000;
const MAX_CUSTOM_SCENARIO_LENGTH = 1_000;

class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

const BUILT_IN_SCENARIOS: TutorScenario[] = [
  {
    id: 'cafe_ordering',
    title: 'カフェで注文する',
    description: 'カフェで飲み物や軽食を注文する練習ができます。',
    aiRole: 'cheerful café cashier',
    sceneSetting: 'A cozy neighborhood café counter with a short menu board.',
    conversationFocus: [
      'Greet the learner and ask what they would like to order',
      'Help them choose items, sizes, or quantities',
      'Confirm the order and mention payment or pick-up details',
    ],
    followUpStyle: 'Offer gentle suggestions, check for add-ons, and confirm details before closing the order.',
  },
  {
    id: 'new_school',
    title: '新しい学校での初日',
    description: '新しい学校でクラスメイトと話す練習ができます。',
    aiRole: 'welcoming classmate',
    sceneSetting: 'A lively school hallway right before class begins.',
    conversationFocus: [
      'Exchange greetings and names',
      'Talk about classes, teachers, or schedules',
      'Invite the learner to join an activity or meet other students',
    ],
    followUpStyle: 'Ask short, friendly questions to keep the chat going and calm any nerves.',
  },
  {
    id: 'picture_description',
    title: '絵を言葉で説明する',
    description: '見えない相手に写真や絵を説明する練習ができます。',
    aiRole: 'curious friend on the phone',
    sceneSetting: 'A quiet call where the learner explains a photo they are looking at.',
    conversationFocus: [
      'Ask what the learner notices first',
      'Guide them to describe people, objects, and actions',
      'Encourage feelings or reasons for why the scene matters',
    ],
    followUpStyle: 'Use gentle prompts to invite more detail without overwhelming the learner.',
  },
  {
    id: 'doctor_visit',
    title: '医者との会話',
    description: '体の調子を医者に伝える練習ができます。',
    aiRole: 'kind family doctor',
    sceneSetting: 'A small clinic room during a routine visit.',
    conversationFocus: [
      'Ask about how the learner feels and where it hurts',
      'Clarify the timing and strength of the symptoms',
      'Suggest easy next steps or simple care instructions',
    ],
    followUpStyle: 'Check understanding with short questions and reassure the learner.',
  },
  {
    id: 'ask_directions',
    title: '道を尋ねる',
    description: '街で道案内をお願いするときの練習ができます。',
    aiRole: 'helpful passerby',
    sceneSetting: 'A busy city street corner with nearby landmarks.',
    conversationFocus: [
      'Ask where the learner needs to go and confirm the destination',
      'Give step-by-step directions with easy landmarks',
      'Check that the learner understands and offer extra help if needed',
    ],
    followUpStyle: 'Give simple guidance and offer to repeat directions in a friendly way.',
  },
];

const FALLBACK_SCENARIO: TutorScenario = {
  id: 'friendly_chat',
  title: 'フリートーク',
  description: '気軽な英会話の練習ができます。',
  aiRole: 'kind English tutor',
  sceneSetting: 'A relaxed online chat focused on everyday topics.',
  conversationFocus: [
    'Keep the conversation casual and supportive',
    'Respond to what the learner says with curious, simple questions',
    'Celebrate effort and gently correct only when helpful',
  ],
  followUpStyle: 'Keep the tone upbeat and encourage the learner to keep talking.',
};

const BASE_TUTOR_RULES = `
Act as a friendly English tutor for a young learner.
Your goal is to have a simple, encouraging chat conversation.
For every message you send, follow these rules:
- Simplicity: Use plain words and simple sentence structures.
- Brevity: Limit your response to a maximum of 3 sentences.
- Tone: Be warm, friendly, and human.
- Line breaks: Write each sentence on a new line.
- Response structure: Always reply using this format exactly:
  English:
  <your English reply, following the rules above>
  Japanese:
  <a natural, easy-to-understand Japanese translation of your English reply>
`;

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.error('[AI Tutor] OPENROUTER_API_KEY is not set. API requests will fail until it is configured.');
}

const openrouter = OPENROUTER_API_KEY
  ? new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: OPENROUTER_API_KEY,
    })
  : null;

function buildScenarioPrompt(options: { scenario?: TutorScenario; customScenario?: string }) {
  const { scenario, customScenario } = options;

  if (customScenario) {
    return `
Scenario: ${customScenario.trim()}.
Adopt a fitting role for this situation and name that role in your first message.
Stay inside this scenario. Ask short follow-up questions that match the situation and help the learner keep talking.
`;
  }

  const selected = scenario ?? FALLBACK_SCENARIO;
  const focus = selected.conversationFocus.map((item) => `- ${item}`).join('\n');

  return `
Scenario: ${selected.title}.
Your role: ${selected.aiRole}.
Setting: ${selected.sceneSetting}.
Conversation focus:\n${focus}
Follow-up style: ${selected.followUpStyle}
Keep every reply grounded in this scenario and guide the learner through it step by step.
`;
}

function createSystemPrompt(args: { scenario?: TutorScenario; customScenario?: string }) {
  const scenarioInstructions = buildScenarioPrompt(args);
  return `${BASE_TUTOR_RULES.trim()}\n\n${scenarioInstructions.trim()}`;
}

function parseTutorResponse(rawContent: unknown) {
  if (typeof rawContent !== 'string') {
    return { english: '', japanese: '' };
  }

  const content = rawContent.trim();
  const sectionMatch = content.match(/English:\s*([\s\S]*?)\s*Japanese:\s*([\s\S]*)/i);

  if (sectionMatch) {
    const [, english, japanese] = sectionMatch;
    return {
      english: english.trim(),
      japanese: japanese.trim(),
    };
  }

  return {
    english: content,
    japanese: '',
  };
}

async function readJsonBody(req: Request): Promise<unknown> {
  const contentType = req.headers.get('content-type')?.toLowerCase() ?? '';
  if (!contentType.startsWith('application/json')) {
    throw new ApiRequestError('Content-Type must be application/json.', 415);
  }

  const declaredLength = Number(req.headers.get('content-length'));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_REQUEST_BYTES) {
    throw new ApiRequestError('Request payload is too large.', 413);
  }

  if (!req.body) {
    throw new ApiRequestError('Request body is required.', 400);
  }

  const reader = req.body.getReader();
  const decoder = new TextDecoder();
  let byteLength = 0;
  let rawBody = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    byteLength += value.byteLength;
    if (byteLength > MAX_REQUEST_BYTES) {
      await reader.cancel();
      throw new ApiRequestError('Request payload is too large.', 413);
    }
    rawBody += decoder.decode(value, { stream: true });
  }
  rawBody += decoder.decode();

  try {
    return JSON.parse(rawBody);
  } catch {
    throw new ApiRequestError('Request body must contain valid JSON.', 400);
  }
}

function parseMessages(value: unknown): TutorMessage[] {
  if (!Array.isArray(value)) {
    throw new ApiRequestError('Invalid payload: messages must be an array.', 400);
  }
  if (value.length === 0 || value.length > MAX_MESSAGES) {
    throw new ApiRequestError(`Invalid payload: messages must contain between 1 and ${MAX_MESSAGES} items.`, 400);
  }

  return value.map((message) => {
    if (!message || typeof message !== 'object') {
      throw new ApiRequestError('Invalid payload: each message must be an object.', 400);
    }

    const { role, content } = message as Record<string, unknown>;
    if (role !== 'user' && role !== 'assistant') {
      throw new ApiRequestError('Invalid payload: message roles must be user or assistant.', 400);
    }
    if (typeof content !== 'string' || content.length === 0 || content.length > MAX_MESSAGE_LENGTH) {
      throw new ApiRequestError(`Invalid payload: message content must contain 1-${MAX_MESSAGE_LENGTH} characters.`, 400);
    }

    return { role, content };
  });
}

export async function GET() {
  const scenarios = BUILT_IN_SCENARIOS.map(({ id, title, description }) => ({ id, title, description }));
  return NextResponse.json({ scenarios, allowCustomScenario: true });
}

export async function POST(req: Request) {
  try {
    if (req.headers.get('sec-fetch-site') === 'cross-site') {
      throw new ApiRequestError('Cross-site requests are not allowed.', 403);
    }

    if (!openrouter) {
      return NextResponse.json(
        { error: 'AI Tutor is unavailable: missing OPENROUTER_API_KEY on the server.' },
        { status: 500 },
      );
    }

    const body = await readJsonBody(req);
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      throw new ApiRequestError('Invalid payload: request body must be an object.', 400);
    }

    const { messages, scenarioId, customScenario } = body as Record<string, unknown>;
    const validatedMessages = parseMessages(messages);

    const trimmedCustomScenario = typeof customScenario === 'string' ? customScenario.trim() : '';
    if (trimmedCustomScenario.length > MAX_CUSTOM_SCENARIO_LENGTH) {
      throw new ApiRequestError(
        `Invalid payload: customScenario must not exceed ${MAX_CUSTOM_SCENARIO_LENGTH} characters.`,
        400,
      );
    }
    const scenario = typeof scenarioId === 'string' ? BUILT_IN_SCENARIOS.find((item) => item.id === scenarioId) : undefined;

    const systemPrompt = createSystemPrompt({
      scenario,
      customScenario: trimmedCustomScenario || undefined,
    });

    const apiMessages = [
      { role: 'system' as const, content: systemPrompt },
      ...validatedMessages,
    ];

    const completion = await openrouter.chat.completions.create({
      model: 'openai/gpt-oss-20b:free',
      messages: apiMessages,
    });

    const messageContent = completion.choices[0]?.message?.content ?? '';
    const { english, japanese } = parseTutorResponse(messageContent);

    return NextResponse.json(
      { text: english, translation: japanese },
      { headers: { 'Cache-Control': 'no-store' } },
    );
  } catch (err) {
    if (err instanceof ApiRequestError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }

    console.error('[AI Tutor] Request failed:', err instanceof Error ? err.message : 'Unknown error');
    return NextResponse.json({ error: 'AI request failed.' }, { status: 500 });
  }
}
