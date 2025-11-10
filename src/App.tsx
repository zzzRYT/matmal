import { useState } from 'react';
import type { SpellCheckerApiResponse } from '../electron/services/schema';
import SpellHelper from './components/SpellHelper';

function App() {
  const [inputText, setInputText] = useState('');
  const [resultData, setResultData] = useState<SpellCheckerApiResponse | null>(
    null
  );
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // [TODO]: gemini를 사용한 맞춤법 검사 구현
  // const handleGemini = async () => {
  //   try {
  //     console.log('call gemini...');
  //     const response = await window.api.generate({
  //       contents: inputText || '안녕하세요',
  //     });
  //     setResultText(response ?? '응답이 없습니다.');
  //   } catch (error) {
  //     console.error(error);
  //     setResultText('오류가 발생했습니다. 콘솔을 확인하세요.');
  //   }
  // };

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
    <div className="w-full min-h-screen flex flex-col bg-gray-50">
      <header className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
        <div className="text-lg font-semibold">Matmal</div>
        <div>
          <button
            aria-label="열기"
            className="p-2 rounded hover:bg-gray-700"
            onClick={() => setShowSettings(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </header>

      <main className="flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <section className="bg-white rounded shadow p-4 flex flex-col">
            <h2 className="text-lg font-medium mb-2">맞춤법 검사 입력</h2>
            <textarea
              className="flex-1 resize-none border rounded p-3 focus:outline-none focus:ring"
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

          <section className="bg-white rounded shadow p-4 flex flex-col">
            <h2 className="text-lg font-medium mb-2">결과</h2>
            <div className="overflow-hidden p-3 border rounded space-y-3">
              {resultData &&
              resultData.PnuErrorWordList.PnuErrorWord.length > 0 ? (
                resultData.PnuErrorWordList.PnuErrorWord.map((word, idx) => (
                  <SpellHelper key={idx} wordList={word} />
                ))
              ) : (
                <p className="text-gray-500">결과가 여기에 표시됩니다.</p>
              )}
            </div>
          </section>
        </div>
      </main>

      <footer className="px-4 py-3 bg-white border-t flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="text-sm text-gray-600 hover:underline"
            onClick={() => setShowHelp(true)}
          >
            도움말
          </button>
        </div>
      </footer>

      {showSettings && (
        <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center">
          <div className="bg-white rounded-t md:rounded p-4 w-full md:w-1/3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">설정</h3>
              <button onClick={() => setShowSettings(false)} className="p-1">
                ✕
              </button>
            </div>
            <div className="mt-3">
              <p className="text-sm text-gray-600">
                여기에 설정을 추가하세요. (예: API 키, 모델 옵션 등)
              </p>
            </div>
          </div>
        </div>
      )}

      {showHelp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded p-4 w-11/12 md:w-1/2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">도움말</h3>
              <button onClick={() => setShowHelp(false)} className="p-1">
                ✕
              </button>
            </div>
            <div className="mt-3 text-sm text-gray-700">
              <p>
                왼쪽 텍스트를 입력하고 '검사하기'를 눌러 맞춤법 검사를 실행할 수
                있습니다.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
