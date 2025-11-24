import { useNavigate } from 'react-router-dom';

import Button from '../../shared/components/ui/Button';
import SpellChecker from '../../apps/spellChecker/components/SpellChecker';

function SpellCheckerPage() {
  const navigate = useNavigate();

  return (
    <>
      <Button variant="primary" onClick={() => navigate('/')} className="mb-4">
        텍스트 입력하러 가기
      </Button>
      <SpellChecker />
    </>
  );
}

export default SpellCheckerPage;
