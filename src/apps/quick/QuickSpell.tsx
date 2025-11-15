import { useEffect, useRef, useState } from 'react';
import { useStore } from 'zustand';

import { SpellCheckerApiResponse } from '../../../electron/services/schema';

import HighlightSpelling from '../spellChecker/components/HighlightSpelling';

import { useSpellCheck } from '../../shared/stores/spell';
import Button from '../../shared/components/ui/Button';

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
    callGenerateSpell(
      '나는 오늘 아침에 밥을 먹고 안녕하세요. 나는 오늘 아침에 밥을 먹고 안녕하세요. 나는 오늘 아침에 밥을 먹고 안녕하세요. 나는 오늘 아침에 밥을 먹고 안녕하세요. 나는 오늘 아침에 밥을 먹고 안녕하세요. 나는 오늘 아침에 밥을 먹고 안녕하세요. 나는 오늘 아침에 밥을 먹고 안녕하세요. 나는 오늘 아침에 밥을 먹고 안녕하세요. 나는 오늘 아침에 밥을 먹고 안녕하세요. 학교를 갔다왔어요. 그 사람은 나보다 키가 더 작치만 운동을 잘해요. 어제 친구들이랑 영화를 봤는데, 진짜 재미있었어여.'
    );
  }, []);

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
        <Button>새 검사</Button>
        <Button>상세 정보 확인</Button>
        <Button>복사</Button>
      </div>
    </div>
  );
}

export default QuickSpell;
