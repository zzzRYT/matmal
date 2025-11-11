import { hanSpellCheck } from '../services/hanSpell';

export async function handleHanSpellCheck(
  _event: unknown,
  opts: { sentence: string; weakOpt?: number }
) {
  try {
    if (!opts.sentence) {
      return { error: 'sentence is required' };
    }

    const data = await hanSpellCheck({
      sentence: opts.sentence,
      weakOpt: opts.weakOpt,
    });
    return data;
  } catch (error) {
    console.error('hanSpell check error:', error);
    return {
      error: (error as Error).message ?? 'API 호출 중 오류가 발생했습니다.',
    };
  }
}
