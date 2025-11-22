import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './shared/components/layout/Header';
import Footer from './shared/components/layout/Footer';
import { ToastContainer } from 'react-toastify';
import { useSpellCheck } from './shared/stores/spell';
import { useStore } from 'zustand';
import { useThemeStore } from './shared/stores/theme';

function App() {
  const { themeSource } = useStore(useThemeStore);
  useEffect(() => {
    useSpellCheck.getState().setSpell('');
  }, []);

  useEffect(() => {
    if (themeSource === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeSource]);

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
