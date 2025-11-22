import { useStore } from 'zustand';
import { clsx } from 'clsx';

import { CandWord } from '../../../../electron/services/schema';
import { useSpellCheck } from '../../../shared/stores/spell';

interface InsteadProps {
  instead: CandWord;
  original?: string;
}

function Instead({ instead, original }: InsteadProps) {
  const { replaceOccurrence } = useStore(useSpellCheck);
  if (!instead) {
    return null;
  }

  const highlightBox = clsx(
    'inline-block px-2 py-1 bg-yellow-100 text-sm text-black rounded hover:bg-yellow-200 cursor-pointer'
  );

  if (!Array.isArray(instead.CandWord)) {
    return (
      <button
        type="button"
        onClick={() => replaceOccurrence(original ?? '', String(instead.CandWord), 1)}
        className={highlightBox}
      >
        {instead.CandWord}
      </button>
    );
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {instead.CandWord.map((word, idx) => (
        <li key={idx}>
          <button
            type="button"
            onClick={() => replaceOccurrence(original ?? '', word, 1)}
            className={highlightBox}
          >
            {word}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Instead;
