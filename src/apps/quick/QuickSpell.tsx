import HighlightSpelling from '../spellChecker/components/HighlightSpelling';

import Button from '../../shared/components/ui/Button';
import { useStore } from 'zustand';
import { useSpellCheck } from '../../shared/stores/spell';
import { handleClipboard } from '../spellChecker/utils';
import { useEffect, useRef, useState } from 'react';
import { SpellCheckerApiResponse } from '../../../electron/services/schema';

function QuickSpell() {
  const { spell, setSpell } = useStore(useSpellCheck);
  const [resultData, setResultData] = useState<SpellCheckerApiResponse | null>(
    null
  );
  const didMountRef = useRef(false);

  const callGenerateSpell = async (sentence: string) => {
    const resultData = await window.api.generate({ sentence });
    setResultData(resultData);
    setSpell(sentence);
  };

  useEffect(() => {
    if (didMountRef.current) return;
    didMountRef.current = true;
    window.ipcRenderer.on('quick-selection', (_event, text) => {
      callGenerateSpell(text);
    });
    return () => {
      window.ipcRenderer.off('quick-selection', (_event, text) => {
        callGenerateSpell(text);
      });
    };
  }, []);

  const handleNewCheck = () => {
    setSpell('');
    window.api.onNavigate('/');
  };

  const handleDetailInfo = () => {
    window.api.onNavigate('/result');
  };

  return (
    <div className="p-4 flex flex-col h-screen">
      <div className="flex gap-4">
        <span className="text-xs text-gray-500">텍스트 수: {spell.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto border border-gray-500 rounded-lg p-1 my-2">
        {resultData ? (
          <HighlightSpelling errorWordsData={resultData} originWords={spell} />
        ) : (
          <div>검사중...</div>
        )}
      </div>
      <div className="flex justify-end gap-4 ">
        <Button onClick={handleNewCheck}>새 검사</Button>
        <Button onClick={handleDetailInfo}>상세 정보 확인</Button>
        <Button onClick={() => handleClipboard(spell)}>복사</Button>
      </div>
    </div>
  );
}

export default QuickSpell;
