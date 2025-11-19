import { useEffect, useState, useRef, useCallback } from 'react';
import { useStore } from 'zustand';
import { useSpellCheck } from '../stores/spell';
import { SpellCheckerApiResponse } from '../../../electron/services/schema';

export const useGeneratedSpell = ({ sentence }: { sentence: string }) => {
  const { setSpell } = useStore(useSpellCheck);
  const [resultData, setResultData] = useState<SpellCheckerApiResponse | null>(null);
  const didMountRef = useRef(false);

  const callGenerateSpell = useCallback(async () => {
    const res = await window.api.generate({ sentence });
    setResultData(res as SpellCheckerApiResponse);
    setSpell(sentence);
  }, [sentence, setSpell]);

  useEffect(() => {
    if (didMountRef.current) return;
    didMountRef.current = true;
    callGenerateSpell();
  }, [callGenerateSpell]);

  return { resultData };
};
