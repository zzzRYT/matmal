import dotenv from 'dotenv';

import { GoogleGenAI } from '@google/genai';
import { getSpellCheckPrompt } from './promptHelper';
import { SpellCheckerApiResponse } from '../schema';

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

dotenv.config();

export async function geminiGenerate(contents: string) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
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
}

export async function checkSpelling(
  text: string
): Promise<SpellCheckerApiResponse | null> {
  const prompt = getSpellCheckPrompt(text);

  try {
    const raw = await geminiGenerate(prompt);
    if (!raw) return null;

    const firstBrace = raw.indexOf('{');
    const lastBrace = raw.lastIndexOf('}');
    const candidate =
      firstBrace !== -1 && lastBrace !== -1
        ? raw.slice(firstBrace, lastBrace + 1)
        : raw;

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
