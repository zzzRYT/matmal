import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../UI/Button';

function UserInput() {
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleSpellingStart = () => {
    if (text.length <= 0) {
      alert('검사할 입력이 필요합니다.');
      return;
    }
    window.localStorage.setItem('spell', text);
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
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="여기에 텍스트를 입력하거나 붙여넣으세요..."
        />
        <div className="mt-2 flex gap-2">
          <Button variant="primary" onClick={handleSpellingStart}>
            검사 실행
          </Button>
          <Button variant="secondary" onClick={() => setText('')}>
            초기화
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UserInput;
