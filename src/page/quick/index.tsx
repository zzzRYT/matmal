import SpellChecker from '../../apps/SpellChecker';

function QuickSpellPage() {
  // [TODO]: 자동으로 drag한 입력이 들어올 수 있도록 구현

  return (
    <div className="p-4">
      <SpellChecker inputText="아년ㅇ하세요" />
    </div>
  );
}

export default QuickSpellPage;
