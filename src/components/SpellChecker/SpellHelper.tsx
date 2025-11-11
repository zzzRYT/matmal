import { PnuErrorWord } from '../../../electron/services/schema';
import Instead from './Instead';

interface SpellHelperProps {
  wordList: PnuErrorWord;
}

function SpellHelper({ wordList }: SpellHelperProps) {
  return (
    <article className="w-full p-4 border rounded bg-white">
      <header className="mb-3">
        <h3 className="text-sm font-semibold">입력 내용</h3>
        <div className="text-base mt-1">{wordList.OrgStr}</div>
      </header>

      <section className="mb-3">
        <h4 className="text-sm font-medium mb-2">대치어</h4>
        <Instead instead={wordList?.CandWordList} />
      </section>

      <section>
        <h4 className="text-sm font-medium mb-2">도움말</h4>
        <div
          className="text-xs text-gray-600"
          dangerouslySetInnerHTML={{ __html: wordList.Help ?? '' }}
        />
      </section>
    </article>
  );
}

export default SpellHelper;
