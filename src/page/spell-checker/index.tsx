import SpellChecker from '../../apps/SpellChecker';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/ui/Button';
import { useStore } from 'zustand';
import { useSpellCheck } from '../../shared/stores/spell';

function SpellCheckerPage() {
  const navigate = useNavigate();
  const { spell } = useStore(useSpellCheck);

  return (
    <div>
      <Button variant="primary" onClick={() => navigate('/')} className="mb-4">
        텍스트 입력하러 가기
      </Button>
      <SpellChecker inputText={spell} />
    </div>
  );
}

export default SpellCheckerPage;
