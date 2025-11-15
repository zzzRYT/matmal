import path from 'node:path';
import { BrowserWindow, ipcMain } from 'electron';
import { FRAME } from './constants';
import { handleGeminiGenerate } from '../controller/gemini';
import { handleHanSpellCheck } from '../controller/hanSpell';

export let mainWin: BrowserWindow | null = null;

export function createMainWindow(
  RENDERER_DIST: string,
  VITE_DEV_SERVER_URL?: string,
  preloadPath?: string
) {
  mainWin = new BrowserWindow({
    icon: path.join(
      process.env.VITE_PUBLIC ?? RENDERER_DIST,
      'electron-vite.svg'
    ),
    webPreferences: {
      preload: preloadPath ?? path.join(RENDERER_DIST, 'preload.mjs'),
    },
    width: FRAME.MAIN.WIDTH,
    height: FRAME.MAIN.HEIGHT,
  });

  mainWin.webContents.on('did-finish-load', () => {
    mainWin?.webContents.send(
      'main-process-message',
      new Date().toLocaleString()
    );
  });

  mainWin.on('closed', () => {
    mainWin = null;
  });

  ipcMain.handle('generate', handleGeminiGenerate);
  ipcMain.handle('hanSpell-check', handleHanSpellCheck);

  if (VITE_DEV_SERVER_URL) {
    mainWin.loadURL(VITE_DEV_SERVER_URL);
  } else {
    mainWin.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }

  return mainWin;
}
