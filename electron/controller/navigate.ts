import { createMainWindow, mainWin } from '../windows/mainWindow';
import { quickWin } from '../windows/quickWindow';

import { RENDERER_DIST, VITE_DEV_SERVER_URL } from '../main';
import { PRELOAD_PATH } from '../paths';

export const handleNavigate = (_event: unknown, path: string) => {
  quickWin?.destroy();

  if (mainWin && !mainWin.isDestroyed()) {
    mainWin.focus();
    mainWin.webContents.send('navigate-to', path);
    return { ok: true };
  }

  createMainWindow(RENDERER_DIST, VITE_DEV_SERVER_URL, PRELOAD_PATH);
  mainWin?.webContents.once('did-finish-load', () => {
    mainWin?.webContents.send('navigate-to', path);
  });
  mainWin?.show();
  mainWin?.focus();
  return { ok: true };
};
