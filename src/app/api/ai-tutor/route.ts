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

const openrouter = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY,
});

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

export async function GET() {
  const scenarios = BUILT_IN_SCENARIOS.map(({ id, title, description }) => ({ id, title, description }));
  return NextResponse.json({ scenarios, allowCustomScenario: true });
}

export async function POST(req: Request) {

  try {
    const body = await req.json();
    const { messages, scenarioId, customScenario } = body ?? {};

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid payload: messages must be an array.' }, { status: 400 });
    }

    const trimmedCustomScenario = typeof customScenario === 'string' ? customScenario.trim() : '';
    const scenario = typeof scenarioId === 'string' ? BUILT_IN_SCENARIOS.find((item) => item.id === scenarioId) : undefined;

    const systemPrompt = createSystemPrompt({
      scenario,
      customScenario: trimmedCustomScenario || undefined,
    });

    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages,
    ];

    const completion = await openrouter.chat.completions.create({
      model: 'openai/gpt-oss-20b:free',
      messages: apiMessages,
    });

    const messageContent = completion.choices[0]?.message?.content ?? '';
    const { english, japanese } = parseTutorResponse(messageContent);

    return NextResponse.json({ text: english, translation: japanese });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: `AI request failed (${err})` }, { status: 500 });
  }
}
