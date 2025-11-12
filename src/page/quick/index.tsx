import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';

function QuickSpellPage() {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  useEffect(() => {
    const handleSelection = (_event: unknown, txt: string) => {
      const v = (txt ?? '') as string;
      setText(v);
      // persist so /result page can read it
      window.localStorage.setItem('spell', v);
      // navigate to result to show SpellChecker
      navigate('/result');
    };

    const handleHotkey = () => {
      // focus input if UI exists
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

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-2">Quick Spell</h3>
      <textarea
        id="quick-input"
        className="w-full h-24 border rounded p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="선택한 텍스트가 여기에 표시됩니다..."
      />
      <div className="mt-2 flex gap-2">
        <Button
          variant="primary"
          onClick={() => {
            window.localStorage.setItem('spell', text);
            navigate('/result');
          }}
        >
          검사 실행 (열기)
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setText('');
            window.localStorage.removeItem('spell');
          }}
        >
          지우기
        </Button>
      </div>
    </div>
  );
}

export default QuickSpellPage;
