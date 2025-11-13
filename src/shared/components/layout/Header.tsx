import { useState } from 'react';

function Header() {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
        <div className="text-lg font-semibold">Matmal</div>
        <div>
          <button aria-label="열기" className="p-2 rounded hover:bg-gray-700">
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
    </>
  );
}

export default Header;
