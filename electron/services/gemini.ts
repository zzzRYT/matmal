import dotenv from 'dotenv';

import { GoogleGenAI } from '@google/genai';

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
  return response.text;
}
