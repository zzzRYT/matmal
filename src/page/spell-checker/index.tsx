import { useEffect, useState } from 'react';
import SpellChecker from '../../components/SpellChecker';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';

function SpellCheckerPage() {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  useEffect(() => {
    const spell = window.localStorage.getItem('spell');
    setText(spell ?? '');
  }, []);

  useEffect(() => {
    const handleSelection = (_event: unknown, txt: string) => {
      setText(txt ?? '');
    };
    const handleHotkey = () => {
      // optional: could focus an input inside this page
    };

    window.ipcRenderer.on('selection-text', handleSelection);
    window.ipcRenderer.on('hotkey-pressed', handleHotkey);

    return () => {
      window.ipcRenderer.off('selection-text', handleSelection);
      window.ipcRenderer.off('hotkey-pressed', handleHotkey);
    };
  }, []);

  return (
    <div>
      <Button variant="primary" onClick={() => navigate('/')} className="mb-4">
        텍스트 입력하러 가기
      </Button>
      <SpellChecker inputText={text} />
    </div>
  );
}

export default SpellCheckerPage;
