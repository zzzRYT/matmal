import { useCallback, useMemo } from 'react';
import { useSpellCheck } from '../../../shared/stores/spell';

import { SpellCheckerApiResponse } from '../../../../electron/services/schema';

import { getCandWord } from '../utils';

interface HighlightSpellingProps {
  originWords: string;
  errorWordsData: SpellCheckerApiResponse;
  className?: string;
}

function escapeRegExp(spell: string) {
  return spell.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function HighlightSpelling({
  originWords,
  errorWordsData,
  className = '',
}: HighlightSpellingProps) {
  const errorList = useMemo(() => {
    if (!errorWordsData?.PnuErrorWordList?.PnuErrorWord) return [];
    return errorWordsData.PnuErrorWordList.PnuErrorWord;
  }, [errorWordsData]);

  const errorMap = useMemo(() => {
    const map: Record<string, string> = {};
    errorList.forEach((item) => {
      const word = getCandWord(item);
      if (item.OrgStr !== word) {
        map[item.OrgStr] = word;
      }
    });
    return map;
  }, [errorList]);

  const tokens = errorList.map((errorWord) => errorWord.OrgStr);

  const replaceOccurrence = useSpellCheck((s) => s.replaceOccurrence);

  const highlight = useCallback(
    (text: string, queries: string[]) => {
      if (!text || queries.length === 0) return text;

      const pattern = queries.map(escapeRegExp).join('|');
      const regex = new RegExp(`(${pattern})`, 'gi');
      const parts = text.split(regex);
      const countsSeen: Record<string, number> = {};

      return (
        <>
          {parts.map((part, index) => {
            const matchedKey = queries.find((word) => word.toLowerCase() === part.toLowerCase());

            if (matchedKey && errorMap[matchedKey]) {
              const candWord = errorMap[matchedKey];
              countsSeen[matchedKey] = (countsSeen[matchedKey] ?? 0) + 1;
              const occurrence = countsSeen[matchedKey];

              return (
                <div
                  key={`highlight-${index}`}
                  className="relative px-1 rounded text-black inline-block overflow-visible pt-6"
                >
                  <button
                    type="button"
                    onClick={() => replaceOccurrence(matchedKey, candWord, occurrence)}
                    className="absolute top-0 left-0 w-max text-xs text-blue-600 font-semibold bg-white border border-blue-300 rounded px-1 shadow-sm whitespace-nowrap cursor-pointer"
                  >
                    {candWord}
                  </button>
                  <mark className="bg-yellow-100">{part}</mark>
                </div>
              );
            }

            return <span key={`normal-${index}`}>{part}</span>;
          })}
        </>
      );
    },
    [errorMap, replaceOccurrence]
  );

  return (
    <div className={`leading-relaxed ${className}`}>{highlight(originWords ?? '', tokens)}</div>
  );
}

export default HighlightSpelling;
