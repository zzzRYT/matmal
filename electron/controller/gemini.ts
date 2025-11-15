import { checkSpelling } from '../services/gemini/gemini';

export async function handleGeminiGenerate(
  _event: unknown,
  opts: { sentence: string }
) {
  console.log('event 호출');
  const translatedText = await checkSpelling(opts.sentence);
  return translatedText;
}
