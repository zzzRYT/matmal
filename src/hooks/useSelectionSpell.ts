import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface UseSelectionSpell {
  to: string;
}

export const useSelectionSpell = ({ to }: UseSelectionSpell) => {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  useEffect(() => {
    const handleSelection = (_event: unknown, text: string) => {
      setText(text);
      window.localStorage.setItem('spell', text);
      navigate(to);
    };

    const handleHotkey = () => {
      const el = document.getElementById(
        'quick-input'
      ) as HTMLTextAreaElement | null;
      if (el) el.focus();
    };

    window.ipcRenderer.on('selection-text', handleSelection);
    window.ipcRenderer.on('hotkey-pressed', handleHotkey);
    return () => {
      window.ipcRenderer.off('selection-text', handleSelection);
      window.ipcRenderer.off('hotkey-pressed', handleHotkey);
    };
  }, [navigate]);

  return { text, setText };
};
