import { ThemeSource, useThemeStore } from '../../../shared/stores/theme';

import Button from '../../../shared/components/ui/Button';

import SettingItem from './SettingItem';

function ThemeSettings() {
  const { themeSource, setThemeSource } = useThemeStore();

  const handleSelectTheme = (theme: ThemeSource) => {
    window.theme.changeTheme(theme);
    setThemeSource(theme);
  };

  return (
    <SettingItem title="테 마" options="vertical">
      <div className="flex items-start flex-col justify-between p-4 bg-gray-100 dark:bg-gray-700 rounded-md gap-2">
        <span className="text-lg text-gray-800 dark:text-gray-200">
          현재 테마:
          <span className="font-semibold text-blue-600 dark:text-blue-400 pl-1">{themeSource}</span>
        </span>
        <div className="flex gap-4">
          <Button onClick={() => handleSelectTheme('light')}>Light모드</Button>
          <Button onClick={() => handleSelectTheme('dark')}>Dark모드</Button>
        </div>
      </div>
    </SettingItem>
  );
}

export default ThemeSettings;
