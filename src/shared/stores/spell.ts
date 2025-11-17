import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SpellState = {
  spell: string;
  setSpell: (sentence: string) => void;
  replaceOccurrence: (from: string, to: string, occurrence?: number) => void;
};

export const useSpellCheck = create<SpellState>()(
  persist(
    (set, get) => ({
      spell: '',
      setSpell: (sentence: string) => set({ spell: sentence }),
      replaceOccurrence: (from: string, to: string, occurrence = 1) => {
        const source = get().spell ?? '';
        if (!from) return;

        let idx = -1;
        let fromIndex = 0;
        for (let i = 0; i < occurrence; i++) {
          idx = source.indexOf(from, fromIndex);
          if (idx === -1) return;
          fromIndex = idx + from.length;
        }

        const newText =
          source.slice(0, idx) + to + source.slice(idx + from.length);
        set({ spell: newText });
      },
    }),
    {
      name: 'spell',
    }
  )
);
