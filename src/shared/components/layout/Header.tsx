function Header() {
  const handleOpenSetting = () => {
    window.api.openSetting();
  };

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
        <div className="text-lg font-semibold">Matmal</div>
        <div>
          <button
            aria-label="열기"
            className="p-2 rounded hover:bg-gray-700"
            onClick={handleOpenSetting}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
    </>
  );
}

export default Header;
