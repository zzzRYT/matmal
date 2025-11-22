import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeSource = 'light' | 'dark';

type State = {
  themeSource: ThemeSource;
};

type Actions = {
  setThemeSource: (source: ThemeSource) => void;
};

export const useThemeStore = create<State & Actions>()(
  persist(
    (set) => ({
      themeSource: 'light',
      setThemeSource: (source: ThemeSource) =>
        set(() => {
          if (source === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { themeSource: source };
        }),
    }),
    {
      name: 'theme',
    }
  )
);
