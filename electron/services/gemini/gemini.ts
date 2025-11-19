import { GoogleGenAI } from '@google/genai';
import { getSpellCheckPrompt } from './promptHelper';
import { SpellCheckerApiResponse } from '../schema';

let ai: ReturnType<typeof createAi> | null = null;

function createAi() {
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

function getAi() {
  if (!ai) ai = createAi();
  return ai;
}

export async function geminiGenerate(contents: string) {
  const models = [
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
  ];

  let lastError: unknown = null;

  for (const model of models) {
    try {
      const response = await getAi().models.generateContent({
        model,
        contents,
      });

      if (!response) return '';
      if (typeof response === 'string') return response;
      const maybeText = (response as { text?: unknown }).text;
      if (typeof maybeText === 'string') return maybeText;
      try {
        return JSON.stringify(response);
      } catch (err) {
        return String(response);
      }
    } catch (error) {
      lastError = error;
      if (error instanceof Error && /503/.test(error.message)) {
        console.warn(`Model ${model} failed with 503 error. Trying next model.`);
      } else {
        console.error(`Gemini model ${model} failed with a non-retryable error.`, error);
        throw error;
      }
    }
  }

  console.error('All Gemini models failed.', lastError);
  throw new Error('All Gemini models failed to generate content.');
}

export async function checkSpelling(text: string): Promise<SpellCheckerApiResponse | null> {
  const prompt = getSpellCheckPrompt(text);

  try {
    const raw = await geminiGenerate(prompt);
    if (!raw) return null;

    const firstBrace = raw.indexOf('{');
    const lastBrace = raw.lastIndexOf('}');
    const candidate =
      firstBrace !== -1 && lastBrace !== -1 ? raw.slice(firstBrace, lastBrace + 1) : raw;

    const resultObject = JSON.parse(candidate);
    if (!resultObject) {
      console.warn('LLM 반환값이 예상 스키마를 따르지 않습니다.', resultObject);
      return null;
    }
    return resultObject as unknown as SpellCheckerApiResponse;
  } catch (error) {
    console.error('LLM 응답 파싱 오류:', error);
    throw new Error('LLM 응답 파싱 오류');
  }
}
