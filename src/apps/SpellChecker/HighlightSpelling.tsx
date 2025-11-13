import { useCallback, useMemo } from 'react';
import { SpellCheckerApiResponse } from '../../../electron/services/schema';
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
  const tokens = useMemo(() => {
    if (!errorWordsData) return [];
    const words = errorWordsData.PnuErrorWordList?.PnuErrorWord;
    return words.map((spell) => spell.OrgStr).filter(Boolean);
  }, [errorWordsData]);

  const highlight = useCallback((spell: string, queries: string[]) => {
    if (!spell) return spell;
    if (!queries || queries.length === 0) return spell;

    const pattern = queries.map((query) => escapeRegExp(query)).join('|');
    const regex = new RegExp(`(${pattern})`, 'gi');
    const parts = spell.split(regex);

    return (
      <>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={`highlight-${index}`}>{part}</mark>
          ) : (
            <span key={`normal-${index}`}>{part}</span>
          )
        )}
      </>
    );
  }, []);

  return (
    <div className={className}>{highlight(originWords ?? '', tokens)}</div>
  );
}

export default HighlightSpelling;
