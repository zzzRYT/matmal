import SpellChecker from './components/SpellChecker';
import Footer from './layout/Footer';
import Header from './layout/Header';

function App() {
  return (
    <div className="w-full flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 p-4">
        <SpellChecker />
      </main>
      <Footer />
    </div>
  );
}

export default App;
