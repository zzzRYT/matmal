import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
import { useSelectionSpell } from '../../hooks/useSelectionSpell';

function QuickSpellPage() {
  const navigate = useNavigate();
  const { text, setText } = useSelectionSpell({ to: '/result' });

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium mb-2">Quick Spell</h3>
      <textarea
        id="quick-input"
        className="w-full h-24 border rounded p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="선택한 텍스트가 여기에 표시됩니다..."
      />
      <div className="mt-2 flex gap-2">
        <Button
          variant="primary"
          onClick={() => {
            window.localStorage.setItem('spell', text);
            navigate('/result');
          }}
        >
          검사 실행 (열기)
        </Button>
        <Button
          variant="ghost"
          onClick={() => {
            setText('');
            window.localStorage.removeItem('spell');
          }}
        >
          지우기
        </Button>
      </div>
    </div>
  );
}

export default QuickSpellPage;
