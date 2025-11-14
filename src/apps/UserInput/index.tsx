import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/ui/Button';
import { useStore } from 'zustand';
import { useSpellCheck } from '../../shared/stores/spell';
import { toast } from 'react-toastify';

function UserInput() {
  const navigate = useNavigate();
  const { spell, setSpell } = useStore(useSpellCheck);

  const handleSpellingStart = () => {
    if (spell.length <= 0) {
      toast.error('검사할 항목을 입력해 주세요.');
      return;
    }
    setSpell(spell);
    navigate('/result');
  };

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          검사할 텍스트
        </label>
        <textarea
          className="w-full min-h-100 border rounded p-3 resize-y"
          value={spell}
          onChange={(e) => setSpell(e.target.value)}
          placeholder="여기에 텍스트를 입력하거나 붙여넣으세요..."
        />
        <div className="mt-2 flex gap-2">
          <Button variant="primary" onClick={handleSpellingStart}>
            검사 실행
          </Button>
          <Button variant="secondary" onClick={() => setSpell('')}>
            초기화
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserInput;
