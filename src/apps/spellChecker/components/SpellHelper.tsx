import { PnuErrorWord } from '../../../../electron/services/schema';
import Instead from './Instead';

interface SpellHelperProps {
  checkWord: PnuErrorWord;
}

function SpellHelper({ checkWord }: SpellHelperProps) {
  return (
    <article className="w-full p-4 border rounded">
      <header className="mb-3">
        <h3 className="text-sm font-semibold">입력 내용</h3>
        <div className="text-base mt-1">{checkWord.OrgStr}</div>
      </header>

      <section className="mb-3">
        <h4 className="text-sm font-medium mb-2">대치어</h4>
        <Instead instead={checkWord?.CandWordList} original={checkWord.OrgStr} />
      </section>

      <section>
        <h4 className="text-sm font-medium mb-2">도움말</h4>
        <div
          className="text-xs text-gray-600"
          dangerouslySetInnerHTML={{ __html: checkWord.Help ?? '' }}
        />
      </section>
    </article>
  );
}

export default SpellHelper;
