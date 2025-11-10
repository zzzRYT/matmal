import { CandWord } from '../../electron/services/schema';

interface InsteadProps {
  instead: CandWord;
}

function Instead({ instead }: InsteadProps) {
  if (!Array.isArray(instead.CandWord)) {
    return (
      <span className="inline-block px-2 py-1 bg-yellow-100 text-sm rounded hover:bg-yellow-200">
        {instead.CandWord}
      </span>
    );
  }

  return (
    <ul className="flex flex-wrap gap-2">
      {instead.CandWord.map((word, idx) => (
        <li key={idx}>
          <button
            type="button"
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
