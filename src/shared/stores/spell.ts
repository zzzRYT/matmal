import { create } from 'zustand';

type State = {
  spell: string;
};

type Action = {
  setSpell: (sentence: string) => void;
};

export const useSpellCheck = create<State & Action>((set) => ({
  spell: '',
  setSpell: (sentence) => set({ spell: sentence }),
}));
