import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type State = {
  spell: string;
  history: string[];
  currentIndex: number;
};

type Actions = {
  setSpell: (sentence: string) => void;
  clearSpell: () => void;
  replaceOccurrence: (from: string, to: string, occurrence?: number) => void;
  undo: () => void;
};

export const useSpellCheck = create<State & Actions>()(
  persist(
    (set, get) => ({
      history: [],
      currentIndex: -1,
      spell: '',
      setSpell: (sentence: string) => set({ spell: sentence }),
      clearSpell: () => set({ spell: '', history: [], currentIndex: -1 }),
      replaceOccurrence: (from: string, to: string, occurrence = 1) => {
        const source = get().spell ?? '';
        set({
          history: [...get().history.slice(0, get().currentIndex + 1), source],
          currentIndex: get().currentIndex + 1,
        });
        if (!from) return;

        let idx = -1;
        let fromIndex = 0;
        for (let i = 0; i < occurrence; i++) {
          idx = source.indexOf(from, fromIndex);
          if (idx === -1) return;
          fromIndex = idx + from.length;
        }

        const newText = source.slice(0, idx) + to + source.slice(idx + from.length);
        set({ spell: newText });
      },
      undo() {
        const { history, currentIndex } = get();
        if (currentIndex < 0) return;
        const previousText = history[currentIndex];
        set({
          spell: previousText,
          currentIndex: currentIndex - 1,
        });
      },
    }),
    {
      name: 'spell',
    }
  )
);
