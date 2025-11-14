import { useStore } from 'zustand';

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

  if (!Array.isArray(instead.CandWord)) {
    return (
      <button
        type="button"
        onClick={() =>
          replaceOccurrence(original ?? '', String(instead.CandWord), 1)
        }
        className="inline-block px-2 py-1 bg-yellow-100 text-sm rounded hover:bg-yellow-200"
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
            className="inline-block px-2 py-1 bg-yellow-100 text-sm rounded hover:bg-yellow-200"
          >
            {word}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Instead;
