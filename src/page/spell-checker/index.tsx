import { useNavigate } from 'react-router-dom';
import { useStore } from 'zustand';
import { useSpellCheck } from '../../shared/stores/spell';

import Button from '../../shared/components/ui/Button';
import SpellChecker from '../../apps/spellChecker/components/SpellChecker';

function SpellCheckerPage() {
  const navigate = useNavigate();
  const { spell } = useStore(useSpellCheck);

  return (
    <>
      <Button variant="primary" onClick={() => navigate('/')} className="mb-4">
        텍스트 입력하러 가기
      </Button>
      <SpellChecker inputText={spell} />
    </>
  );
}

export default SpellCheckerPage;
