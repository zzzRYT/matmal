import { useEffect, useState, useRef } from 'react';
import { useStore } from 'zustand';
import { useSpellCheck } from '../stores/spell';
import { SpellCheckerApiResponse } from '../../../electron/services/schema';

export const useGeneratedSpell = ({ sentence }: { sentence: string }) => {
  const { setSpell } = useStore(useSpellCheck);
  const [resultData, setResultData] = useState<SpellCheckerApiResponse | null>(
    null
  );
  const didMountRef = useRef(false);

  const callGenerateSpell = async () => {
    const res = await window.api.generate({ sentence });
    setResultData(res as SpellCheckerApiResponse);
    setSpell(sentence);
  };

  useEffect(() => {
    if (didMountRef.current) return;
    didMountRef.current = true;
    callGenerateSpell();
  }, []);

  return { resultData };
};
