import path from 'node:path';
import { BrowserWindow } from 'electron';
import { FRAME } from './constants';

export let quickWin: BrowserWindow | null = null;

export function createQuickWindow(
  RENDERER_DIST: string,
  VITE_DEV_SERVER_URL?: string,
  preloadPath?: string
) {
  quickWin = new BrowserWindow({
    width: FRAME.WIDTH,
    height: FRAME.HEIGHT,
    show: false,
    frame: true,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      preload: preloadPath ?? path.join(RENDERER_DIST, 'preload.mjs'),
      contextIsolation: true,
    },
  });

  quickWin.on('closed', () => {
    quickWin = null;
  });

  if (VITE_DEV_SERVER_URL) {
    quickWin.loadURL(`${VITE_DEV_SERVER_URL}quick`);
  } else {
    quickWin.loadFile(path.join(RENDERER_DIST, 'index.html'));
    quickWin.webContents.once('did-finish-load', () => {
      quickWin?.webContents.send('navigate-to', '/quick');
    });
  }

  return quickWin;
}
