import path from 'node:path';
import { BrowserWindow } from 'electron';
import { FRAME } from './constants';

export let mainWin: BrowserWindow | null = null;

export function createMainWindow(
  RENDERER_DIST: string,
  VITE_DEV_SERVER_URL?: string,
  preloadPath?: string
) {
  mainWin = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC ?? RENDERER_DIST, 'electron-vite.svg'),
    webPreferences: {
      preload: preloadPath ?? path.join(RENDERER_DIST, 'preload.mjs'),
    },
    width: FRAME.MAIN.WIDTH,
    height: FRAME.MAIN.HEIGHT,
  });

  mainWin.webContents.on('did-finish-load', () => {
    mainWin?.webContents.send('main-process-message', new Date().toLocaleString());
  });

  mainWin.on('closed', () => {
    mainWin = null;
  });

  if (VITE_DEV_SERVER_URL) {
    mainWin.loadURL(VITE_DEV_SERVER_URL);
  } else {
    const indexHtml = path.join(RENDERER_DIST, 'index.html');

    mainWin.loadFile(indexHtml).catch((e) => {
      console.error('Failed to load index.html:', e);
    });
  }

  return mainWin;
}
