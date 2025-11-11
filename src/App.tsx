import { Outlet } from 'react-router-dom';
import Footer from './layout/Footer';
import Header from './layout/Header';

function App() {
  return (
    <div className="w-full flex flex-col bg-gray-50 min-h-screen">
      <Header />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
