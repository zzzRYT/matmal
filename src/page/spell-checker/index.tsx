import { useEffect, useState } from 'react';
import SpellChecker from '../../components/SpellChecker';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';

function SpellCheckerPage() {
  const navigate = useNavigate();
  const [text, setText] = useState('');

  useEffect(() => {
    const spell = window.localStorage.getItem('spell');
    setText(spell ?? '');
  }, []);

  return (
    <div>
      <Button variant="primary" onClick={() => navigate(-1)} className="mb-4">
        텍스트 입력하러 가기
      </Button>
      <SpellChecker inputText={text} />
    </div>
  );
}

export default SpellCheckerPage;
