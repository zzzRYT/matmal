import { useState } from 'react';

import SpellHelper from '../SpellHelper';

import { SpellCheckerApiResponse } from '../../../electron/services/schema';

function SpellChecker() {
  const [inputText, setInputText] = useState('');
  const [resultData, setResultData] = useState<SpellCheckerApiResponse | null>(
    null
  );

  const handleHanSpellChecker = async () => {
    try {
      console.log('call hanSpell...');
      const response = await window.api.hanSpell({
        sentence: inputText || '안녕하세요',
      });
      setResultData(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full gap-4 min-h-145">
      <section className="bg-white rounded shadow p-4 flex-1 flex flex-col min-h-0">
        <h2 className="text-lg font-medium mb-2">맞춤법 검사 입력</h2>
        <textarea
          className="flex-1 h-full min-h-0 resize-none border rounded p-3 focus:outline-none focus:ring"
          placeholder="여기에 검사할 텍스트를 입력하세요..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={10}
        />
        <div className="mt-3 flex items-center gap-2">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleHanSpellChecker}
          >
            검사하기
          </button>
          <button
            className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setInputText('')}
          >
            지우기
          </button>
        </div>
      </section>

      <section className="flex-1 bg-white rounded shadow p-4 flex flex-col min-h-0">
        <h2 className="text-lg font-medium mb-2">결과</h2>
        <div className="overflow-auto rounded space-y-3 flex-1 min-h-0">
          {resultData && resultData.PnuErrorWordList.PnuErrorWord.length > 0 ? (
            resultData.PnuErrorWordList.PnuErrorWord.map((word, idx) => (
              <SpellHelper key={idx} wordList={word} />
            ))
          ) : (
            <p className="text-gray-500">결과가 여기에 표시됩니다.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default SpellChecker;
