import { hanSpellCheck } from '../services/hanSpell';

export async function handleHanSpellCheck(
  _event: unknown,
  opts: { sentence: string; weakOpt?: number }
) {
  try {
    if (!opts.sentence) {
      return { error: 'sentence is required' };
    }

    const data = await hanSpellCheck(opts.sentence, opts.weakOpt ?? 0);
    return data;
  } catch (error) {
    console.error('hanSpell check error:', error);
    return {
      error: (error as Error).message ?? 'API 호출 중 오류가 발생했습니다.',
    };
  }
}
