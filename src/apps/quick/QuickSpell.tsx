import { useEffect, useState, useCallback } from 'react';
import { useStore } from 'zustand';

import { SpellCheckerApiResponse } from '../../../electron/services/schema';

import HighlightSpelling from '../spellChecker/components/HighlightSpelling';
import { handleClipboard } from '../spellChecker/utils';

import { useSpellCheck } from '../../shared/stores/spell';
import { LoadingSpinner } from '../../shared/components/ui/Loading';
import Button from '../../shared/components/ui/Button';

type Status = 'loading' | 'success' | 'error';

function QuickSpell() {
  const { spell, setSpell, clearSpell } = useStore(useSpellCheck);
  const [resultData, setResultData] = useState<SpellCheckerApiResponse | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const callGenerateSpell = useCallback(
    async (sentence: string) => {
      setStatus('loading');
      setSpell(sentence);
      try {
        const result = await window.api.generate({ sentence });
        setResultData(result);
        setStatus('success');
      } catch (err) {
        setErrorMessage((err as Error).message || '맞춤법 검사에 실패했습니다.');
        setStatus('error');
      }
    },
    [setSpell]
  );

  useEffect(() => {
    const handleQuickSpellLoading = () => {
      setStatus('loading');
      setResultData(null);
      setErrorMessage(null);
      clearSpell();
    };

    const handleQuickSelection = (_event: unknown, text: string) => {
      setTimeout(() => {
        callGenerateSpell(text);
      }, 200);
    };

    const handleQuickSelectionError = (_event: unknown, message: string) => {
      setErrorMessage(message);
      setStatus('error');
    };

    window.ipcRenderer.on('quick-spell-loading', handleQuickSpellLoading);
    window.ipcRenderer.on('quick-selection', handleQuickSelection);
    window.ipcRenderer.on('quick-selection-error', handleQuickSelectionError);

    handleQuickSpellLoading();

    return () => {
      window.ipcRenderer.off('quick-spell-loading', handleQuickSpellLoading);
      window.ipcRenderer.off('quick-selection', handleQuickSelection);
      window.ipcRenderer.off('quick-selection-error', handleQuickSelectionError);
    };
  }, [callGenerateSpell, clearSpell]);

  const handleNewCheck = () => {
    clearSpell();
    window.api.onNavigate('/');
  };

  const handleDetailInfo = () => {
    window.api.onNavigate('/result');
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <LoadingSpinner />;
      case 'success':
        return resultData ? (
          <HighlightSpelling errorWordsData={resultData} originWords={spell} />
        ) : (
          <div>결과가 없습니다.</div>
        );
      case 'error':
        return <div className="text-red-500">{errorMessage}</div>;
      default:
        return null;
    }
  };

  return (
    <div className="p-4 flex flex-col h-screen [-webkit-app-region:drag]">
      <div className="flex gap-4">
        {status === 'success' && (
          <span className="text-xs text-gray-500">텍스트 수: {spell.length}</span>
        )}
      </div>
      <div className="flex-1 overflow-y-auto border border-gray-500 rounded-lg p-1 my-2 [-webkit-app-region:no-drag]">
        {renderContent()}
      </div>
      <div className="flex justify-end gap-4 [-webkit-app-region:no-drag]">
        <Button onClick={handleNewCheck}>새 검사</Button>
        {status === 'success' && (
          <>
            <Button onClick={handleDetailInfo}>상세 정보 확인</Button>
            <Button onClick={() => handleClipboard(spell)}>복사</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default QuickSpell;
