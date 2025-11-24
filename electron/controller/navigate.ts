import { createMainWindow, mainWin } from '../windows/mainWindow';
import { quickWin } from '../windows/quickWindow';

import { RENDERER_DIST, VITE_DEV_SERVER_URL } from '../main';
import { PRELOAD_PATH } from '../paths';

export const handleNavigate = (_event: unknown, path: string, payload?: string) => {
  quickWin?.destroy();

  if (mainWin && !mainWin.isDestroyed()) {
    mainWin.focus();
    mainWin.webContents.send('navigate-to', path);
    if (payload) {
      mainWin.webContents.send('set-spell-from-quick-window', payload);
    }
    return { ok: true };
  }

  createMainWindow(RENDERER_DIST, VITE_DEV_SERVER_URL, PRELOAD_PATH);
  mainWin?.webContents.once('did-finish-load', () => {
    mainWin?.webContents.send('navigate-to', path);
    if (payload) {
      mainWin?.webContents.send('set-spell-from-quick-window', payload);
    }
  });
  mainWin?.show();
  mainWin?.focus();
  return { ok: true };
};
