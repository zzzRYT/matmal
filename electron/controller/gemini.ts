import { checkSpelling } from '../services/gemini/gemini';

export async function handleGeminiGenerate(_event: unknown, opts: { sentence: string }) {
  const translatedText = await checkSpelling(opts.sentence);
  return translatedText;
}
