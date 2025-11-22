import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type ThemeSource = 'light' | 'dark' | 'system';

type State = {
  themeSource: ThemeSource;
};

type Actions = {
  setThemeSource: (source: ThemeSource) => void;
  initializeTheme: () => Promise<void>;
};

export const useThemeStore = create<State & Actions>()(
  persist(
    (set) => ({
      themeSource: 'system',
      setThemeSource: (source: ThemeSource) =>
        set(() => {
          if (source === 'dark') {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
          return { themeSource: source };
        }),
      initializeTheme: async () => {
        const theme = await window.theme.getTheme();
        set({ themeSource: theme });
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
    }),
    {
      name: 'theme',
    }
  )
);
