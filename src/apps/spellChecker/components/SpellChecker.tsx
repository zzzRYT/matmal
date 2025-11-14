import { useEffect, useState, useRef } from 'react';
import { useSpellCheck } from '../../../shared/stores/spell';

import { SpellCheckerApiResponse } from '../../../../electron/services/schema';

import SpellHelper from './SpellHelper';
import HighlightSpelling from './HighlightSpelling';
import { getCandWord } from '../utils';
import { useStore } from 'zustand';

interface SpellChecker {
  inputText: string;
}

function SpellChecker({ inputText }: SpellChecker) {
  // use global store for text to reduce prop drilling
  const { spell, setSpell } = useStore(useSpellCheck);

  const [resultData, setResultData] = useState<SpellCheckerApiResponse | null>(
    null
  );

  const didMountRef = useRef(false);

  const callGenerateSpell = async (sentence?: string) => {
    const res = await window.api.generate({ sentence: sentence ?? spell });
    setResultData(res as SpellCheckerApiResponse);
    setSpell(inputText);
  };

  useEffect(() => {
    if (didMountRef.current) return;
    didMountRef.current = true;
    callGenerateSpell();
  }, []);

  return (
    <>
      <div className="flex w-full gap-4 min-h-145 grow ">
        <section className="bg-white rounded shadow p-4 flex-1 flex flex-col min-h-0">
          <h2 className="text-lg font-medium mb-2">맞춤법 검사 입력</h2>
          {resultData ? (
            <HighlightSpelling
              originWords={spell}
              errorWordsData={resultData}
            />
          ) : (
            <div>검사중...</div>
          )}
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
              if (raw.length === 0)
                return (
                  <p className="text-gray-500">결과가 여기에 표시됩니다.</p>
                );
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
