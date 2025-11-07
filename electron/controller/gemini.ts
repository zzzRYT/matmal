import { geminiGenerate } from '../services/gemini';

export async function handleGeminiGenerate(
  _event: unknown,
  opts: { contents: string }
) {
  try {
    const translatedText = await geminiGenerate(opts.contents);
    return translatedText?.trim();
  } catch (error) {
    return 'API 호출 중 오류가 발생했습니다.';
  }
}
