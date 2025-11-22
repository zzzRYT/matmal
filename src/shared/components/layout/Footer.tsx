import { useState } from 'react';

function Footer() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
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

      {showHelp && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="bg-white rounded p-4 w-11/12 md:w-1/2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">도움말</h3>
              <button onClick={() => setShowHelp(false)} className="p-1">
                ✕
              </button>
            </div>
            <ul className="mt-3 text-sm text-gray-700 list-disc px-3">
              <li>텍스트를 입력하고 '검사하기'를 눌러 맞춤법 검사를 실행할 수 있습니다.</li>
              <li>
                원하는 글자 드레그 후 [ctrl or Command + shift + d] 키를 눌러 quick window를 실행할
                수 있습니다.
              </li>
              <li>에러가 발생한다면 앱을 껐다가 켜 보세요.</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Footer;
