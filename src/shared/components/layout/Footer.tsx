import { useState } from 'react';

function Footer() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <footer className="px-4 py-3 bg-white border-t flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="text-sm text-gray-600 hover:underline">도움말</button>
        </div>
      </footer>

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
              <p>왼쪽 텍스트를 입력하고 '검사하기'를 눌러 맞춤법 검사를 실행할 수 있습니다.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
