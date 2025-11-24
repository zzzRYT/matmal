import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './shared/components/layout/Header';
import Footer from './shared/components/layout/Footer';
import { ToastContainer } from 'react-toastify';
import { useSpellCheck } from './shared/stores/spell';

function App() {
  const { setSpell } = useSpellCheck();

  useEffect(() => {
    const handleSetSpell = (_event: unknown, text: string) => {
      setSpell(text);
    };

    window.ipcRenderer.on('set-spell-from-quick-window', handleSetSpell);

    return () => {
      window.ipcRenderer.off('set-spell-from-quick-window', handleSetSpell);
    };
  }, [setSpell]);

  return (
    <>
      <div className="w-full flex flex-col h-screen">
        <Header />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
