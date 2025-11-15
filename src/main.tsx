import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SpellCheckerPage from './page/spell-checker/index.tsx';
import QuickSpellPage from './page/quick/index.tsx';
import UserInputPage from './page/user-input/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="" element={<UserInputPage />} />
          <Route path="result" element={<SpellCheckerPage />} />
        </Route>
        <Route path="/quick" element={<QuickSpellPage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

window.ipcRenderer.on('navigate-to', (_event, path: string) => {
  try {
    window.location.pathname = path;
  } catch (err) {
    console.warn('navigate-to failed', err);
  }
});
