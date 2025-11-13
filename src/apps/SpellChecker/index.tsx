import { useEffect, useState } from 'react';

import SpellHelper from './SpellHelper';
import HighlightSpelling from './HighlightSpelling';

import { SpellCheckerApiResponse } from '../../../electron/services/schema';

interface SpellChecker {
  inputText: string;
}

function SpellChecker({ inputText }: SpellChecker) {
  const [resultData, setResultData] = useState<SpellCheckerApiResponse | null>(
    null
  );

  const callGenerateSpell = async () => {
    const res = await window.api.generate({ sentence: inputText });
    setResultData(res as SpellCheckerApiResponse);
  };

  useEffect(() => {
    if (!inputText) {
      setResultData(null);
      return;
    }
    callGenerateSpell();
  }, [inputText]);

  return (
    <>
      <div className="flex w-full gap-4 min-h-145 grow ">
        <section className="bg-white rounded shadow p-4 flex-1 flex flex-col min-h-0">
          <h2 className="text-lg font-medium mb-2">맞춤법 검사 입력</h2>
          {resultData ? (
            <HighlightSpelling
              originWords={inputText}
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
              return raw.map((word, idx) => (
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
