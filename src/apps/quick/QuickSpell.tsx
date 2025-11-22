import HighlightSpelling from '../spellChecker/components/HighlightSpelling';

import Button from '../../shared/components/ui/Button';
import { useStore } from 'zustand';
import { useSpellCheck } from '../../shared/stores/spell';
import { handleClipboard } from '../spellChecker/utils';
import { useEffect, useRef, useState, useCallback } from 'react';
import { SpellCheckerApiResponse } from '../../../electron/services/schema';

function QuickSpell() {
  const { spell, setSpell, clearSpell } = useStore(useSpellCheck);
  const [resultData, setResultData] = useState<SpellCheckerApiResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const didMountRef = useRef(false);

  const callGenerateSpell = useCallback(
    async (sentence: string) => {
      try {
        const resultData = await window.api.generate({ sentence });
        setResultData(resultData);
        setSpell(sentence);
      } catch (err) {
        setError(err as Error);
      }
    },
    [setSpell]
  );

  useEffect(() => {
    if (didMountRef.current) return;
    didMountRef.current = true;
    const handleQuickSelection = (_event: unknown, text: string) => {
      callGenerateSpell(text);
    };
    window.ipcRenderer.on('quick-selection', handleQuickSelection);
    return () => {
      window.ipcRenderer.off('quick-selection', handleQuickSelection);
    };
  }, [callGenerateSpell]);

  const handleNewCheck = () => {
    clearSpell();
    window.api.onNavigate('/');
  };

  const handleDetailInfo = () => {
    window.api.onNavigate('/result');
  };

  if (error) {
    throw error;
  }

  return (
    <div className="p-4 flex flex-col h-screen [-webkit-app-region:drag]">
      <div className="flex gap-4">
        <span className="text-xs text-gray-500">텍스트 수: {spell.length}</span>
      </div>
      <div className="flex-1 overflow-y-auto border border-gray-500 rounded-lg p-1 my-2 [-webkit-app-region:no-drag]">
        {resultData ? (
          <HighlightSpelling errorWordsData={resultData} originWords={spell} />
        ) : (
          <div>검사중...</div>
        )}
      </div>
      <div className="flex justify-end gap-4 [-webkit-app-region:no-drag]">
        <Button onClick={handleNewCheck}>새 검사</Button>
        <Button onClick={handleDetailInfo}>상세 정보 확인</Button>
        <Button onClick={() => handleClipboard(spell)}>복사</Button>
      </div>
    </div>
  );
}

export default QuickSpell;
