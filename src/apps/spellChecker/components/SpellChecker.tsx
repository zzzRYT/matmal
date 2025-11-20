import { useEffect, useState, useRef, useCallback } from 'react';
import { useStore } from 'zustand';

import { SpellCheckerApiResponse } from '../../../../electron/services/schema';

import SpellHelper from './SpellHelper';
import HighlightSpelling from './HighlightSpelling';
import { getCandWord, handleClipboard } from '../utils';

import Button from '../../../shared/components/ui/Button';
import { useSpellCheck } from '../../../shared/stores/spell';

interface SpellChecker {
  inputText: string;
}

function SpellChecker({ inputText }: SpellChecker) {
  const { spell, setSpell, undo } = useStore(useSpellCheck);
  const [resultData, setResultData] = useState<SpellCheckerApiResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const didMountRef = useRef(false);

  const callGenerateSpell = useCallback(
    async (sentence?: string) => {
      try {
        const res = await window.api.generate({ sentence: sentence ?? spell });
        setResultData(res as SpellCheckerApiResponse);
        setSpell(inputText);
      } catch (err) {
        setError(err as Error);
      }
    },
    [spell, inputText, setSpell]
  );

  useEffect(() => {
    if (didMountRef.current) return;
    didMountRef.current = true;
    callGenerateSpell();
  }, [callGenerateSpell]);

  if (error) {
    throw error;
  }

  return (
    <>
      <div className="flex w-full gap-4">
        <section className="bg-white rounded shadow p-4 flex-1 flex flex-col h-120">
          <h2 className="text-lg font-medium mb-2">맞춤법 검사 입력</h2>
          <div className="flex-1 overflow-auto">
            {resultData ? (
              <HighlightSpelling originWords={spell} errorWordsData={resultData} />
            ) : (
              <div>검사중...</div>
            )}
          </div>
          <div className="flex justify-end gap-4">
            <Button onClick={undo}>뒤로돌리기</Button>
            <Button onClick={() => handleClipboard(spell)}>Copy</Button>
          </div>
        </section>

        <section className="flex-1 bg-white rounded shadow p-4 flex flex-col h-120">
          <h2 className="text-lg font-medium mb-2">결과</h2>
          <div className="overflow-auto space-y-3 flex-1 min-h-0">
            {(() => {
              if (!resultData) return <p className="text-gray-500">결과가 여기에 표시됩니다.</p>;
              const raw = resultData.PnuErrorWordList?.PnuErrorWord;
              if (raw.length === 0)
                return <p className="text-gray-500">결과가 여기에 표시됩니다.</p>;
              return raw.map((word, idx) => {
                const currentWord = getCandWord(word);
                if (currentWord !== word.OrgStr) {
                  return <SpellHelper key={idx} checkWord={word} />;
                }
              });
            })()}
          </div>
        </section>
      </div>
    </>
  );
}

export default SpellChecker;
