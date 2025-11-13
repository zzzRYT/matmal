import { useEffect, useState } from 'react';

import SpellHelper from './SpellHelper';
import HighlightSpelling from './HighlightSpelling';
type Highlight = { start: number; end: number; id: string; meta: unknown };

import { SpellCheckerApiResponse } from '../../../electron/services/schema';

interface SpellChecker {
  inputText: string;
}

function SpellChecker({ inputText }: SpellChecker) {
  const [resultData, setResultData] = useState<SpellCheckerApiResponse | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!inputText) {
      setResultData(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const t = setTimeout(async () => {
      try {
        const res = await window.api.generate({ sentence: inputText });
        if (!cancelled) setResultData(res as SpellCheckerApiResponse);
      } catch (err) {
        console.error('hanSpell error', err);
        if (!cancelled) setResultData(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [inputText]);

  function computeHighlights(text: string) {
    if (!resultData) return [] as Highlight[];
    const raw = resultData.PnuErrorWordList?.PnuErrorWord;
    const errors = Array.isArray(raw) ? raw : raw ? [raw] : [];
    const highlights: Highlight[] = [];
    const used = new Array(text.length).fill(false);
    for (const err of errors) {
      const token = err.OrgStr ?? '';
      if (!token) continue;
      let pos = text.indexOf(token);
      while (pos !== -1) {
        const overlap = used.slice(pos, pos + token.length).some(Boolean);
        if (!overlap) break;
        pos = text.indexOf(token, pos + 1);
      }
      if (pos !== -1) {
        highlights.push({
          start: pos,
          end: pos + token.length,
          id: `${pos}-${token}`,
          meta: err,
        });
        for (let i = pos; i < pos + token.length && i < used.length; i++)
          used[i] = true;
      }
    }
    return highlights;
  }

  return (
    <>
      {loading && <div className="text-xs text-gray-500 mt-2">검사 중...</div>}
      <div className="flex w-full gap-4 min-h-145 grow ">
        <section className="bg-white rounded shadow p-4 flex-1 flex flex-col min-h-0">
          <h2 className="text-lg font-medium mb-2">맞춤법 검사 입력</h2>

          <HighlightSpelling
            value={inputText}
            highlights={computeHighlights(inputText)}
            className="flex-1 h-full min-h-0 border rounded"
            onClickHighlight={(h) => console.log('clicked highlight', h)}
          />
        </section>

        <section className="flex-1 bg-white rounded shadow p-4 flex flex-col max-h-screen">
          <h2 className="text-lg font-medium mb-2">결과</h2>
          <div className="overflow-auto space-y-3 flex-1 min-h-0">
            {(() => {
              if (!resultData)
                return (
                  <p className="text-gray-500">결과가 여기에 표시됩니다.</p>
                );
              const raw = resultData.PnuErrorWordList?.PnuErrorWord;
              const errorsArr = Array.isArray(raw) ? raw : raw ? [raw] : [];
              if (errorsArr.length === 0)
                return (
                  <p className="text-gray-500">결과가 여기에 표시됩니다.</p>
                );
              return errorsArr.map((word, idx) => (
                <SpellHelper key={idx} wordList={word} />
              ));
            })()}
          </div>
        </section>
      </div>
    </>
  );
}

export default SpellChecker;
