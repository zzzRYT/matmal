import path from 'node:path';
import { BrowserWindow } from 'electron';
import { FRAME } from './constants';

export let quickWin: BrowserWindow | null = null;

export function createQuickWindow(
  RENDERER_DIST: string,
  VITE_DEV_SERVER_URL?: string,
  preloadPath?: string,
  options?: { x: number; y: number }
) {
  quickWin = new BrowserWindow({
    x: options?.x,
    y: options?.y,
    width: FRAME.QUICK.WIDTH,
    height: FRAME.QUICK.HEIGHT,
    show: false,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      preload: preloadPath ?? path.join(RENDERER_DIST, 'preload.mjs'),
      contextIsolation: true,
    },
  });

  quickWin.on('blur', () => {
    if (!quickWin) return;
    if (!quickWin.webContents.isDevToolsOpened()) {
      quickWin.hide();
    }
  });

  quickWin.on('closed', () => {
    quickWin = null;
  });

  if (VITE_DEV_SERVER_URL) {
    const target = `${VITE_DEV_SERVER_URL.replace(/\/$/, '')}/#${'/quick'}`;
    quickWin.loadURL(target);
  } else {
    quickWin.loadFile(path.join(RENDERER_DIST, 'index.html'));
    quickWin.webContents.once('did-finish-load', () => {
      quickWin?.webContents.send('navigate-to', '/quick');
    });
  }

  return quickWin;
}
