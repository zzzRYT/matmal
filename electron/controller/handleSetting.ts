import { createSettingWindow, settingWin } from '../windows/settingWindow';

export const handleSetting = (_event: unknown, path: string) => {
  settingWin?.destroy();
  if (!settingWin || settingWin.isDestroyed()) {
    createSettingWindow();
    settingWin?.webContents.once('did-finish-load', () => {
      settingWin?.webContents.send('navigate-to', path);
    });
    settingWin?.show();
    settingWin?.focus();
    return { ok: true };
  }

  return { ok: false, reason: 'unknown window' };
};
