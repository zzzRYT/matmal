import { checkSpelling } from '../services/gemini/gemini';

export async function handleGeminiGenerate(
  _event: unknown,
  opts: { sentence: string }
) {
  try {
    const translatedText = await checkSpelling(opts.sentence);
    return translatedText;
  } catch (error) {
    return 'API 호출 중 오류가 발생했습니다.';
  }
}
