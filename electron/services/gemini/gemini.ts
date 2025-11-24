import { GoogleGenAI } from '@google/genai';
import { getSpellCheckPrompt } from './promptHelper';
import { SpellCheckerApiResponse } from '../schema';

let ai: ReturnType<typeof createAi> | null = null;

function createAi() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set in environment variables.');
  }
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

function getAi() {
  if (!ai) ai = createAi();
  return ai;
}

const GEN_MODELS = [
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash',
  'gemini-2.0-flash-lite',
  'gemini-2.0-flash',
];

async function generateWithSingleModel(
  modelName: string,
  contents: string
): Promise<string | null> {
  const response = await getAi().models.generateContent({
    model: modelName,
    contents,
  });

  if (!response) return null;
  if (typeof response === 'string') return response;
  const maybeText = (response as { text?: unknown }).text;
  if (typeof maybeText === 'string') return maybeText;
  try {
    return JSON.stringify(response);
  } catch {
    return null;
  }
}

export async function geminiGenerate(contents: string): Promise<string> {
  let lastError: unknown = null;

  for (const modelName of GEN_MODELS) {
    try {
      const result = await generateWithSingleModel(modelName, contents);

      if (result) return result;
    } catch (error) {
      console.warn(`Model [${modelName}] failed. Reason:`, error);
      lastError = error;
    }
  }
  throw lastError || new Error('All models failed silently.');
}

export async function checkSpelling(text: string): Promise<SpellCheckerApiResponse | null> {
  const prompt = getSpellCheckPrompt(text);

  try {
    const raw = await geminiGenerate(prompt);

    const firstBrace = raw.indexOf('{');
    const lastBrace = raw.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1) {
      return null;
    }

    const candidate = raw.slice(firstBrace, lastBrace + 1);
    const resultObject = JSON.parse(candidate);

    if (!resultObject || typeof resultObject !== 'object') {
      return null;
    }

    return resultObject as unknown as SpellCheckerApiResponse;
  } catch (error) {
    console.error('Spelling check process failed:', error);
    throw error;
  }
}
