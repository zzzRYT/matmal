import { useNavigate } from 'react-router-dom';
import Button from '../../shared/components/ui/Button';
import { useStore } from 'zustand';
import { useSpellCheck } from '../../shared/stores/spell';
import { toast } from 'react-toastify';
import clsx from 'clsx';

const TEXT_LIMIT = 500;

function UserInput() {
  const navigate = useNavigate();
  const { spell, setSpell } = useStore(useSpellCheck);

  const isValidationText = (text: string) => {
    if (text.length > TEXT_LIMIT) {
      toast.error(`텍스트는 ${TEXT_LIMIT}자 이내로 입력해 주세요.`);
      return false;
    }
    if (text.trim().length === 0) {
      toast.error('검사할 텍스트를 입력해 주세요.');
      return false;
    }
    return true;
  };

  const handleSpellingStart = () => {
    if (!isValidationText(spell)) return;
    setSpell(spell);
    navigate('/result');
  };

  const overTextLimit = clsx({
    'text-red-600': spell.length > TEXT_LIMIT,
  });

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-500 mb-2">검사할 텍스트</label>
        <textarea
          className="w-full min-h-100 border rounded p-3 resize-y relative"
          value={spell}
          onChange={(e) => setSpell(e.target.value)}
          placeholder="여기에 텍스트를 입력하거나 붙여넣으세요..."
        ></textarea>
        <span className={`flex justify-end ${overTextLimit}`}>
          글자수 : {spell.length}/{TEXT_LIMIT}
        </span>
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
