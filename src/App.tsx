import { Outlet } from 'react-router-dom';
import Header from './shared/components/layout/Header';
import Footer from './shared/components/layout/Footer';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <div className="w-full flex flex-col bg-gray-50 h-screen">
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
