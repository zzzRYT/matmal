import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { app, globalShortcut, ipcMain, BrowserWindow } from 'electron';

import { createMainWindow as makeMainWindow } from './windows/mainWindow';
import { quickWin } from './windows/quickWindow';
import { createQuickWindow } from './windows/quickWindow';
import { handleGeminiGenerate } from './controller/gemini';
import { handleHanSpellCheck } from './controller/hanSpell';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const preloadPath = path.join(__dirname, 'preload.mjs');

process.env.APP_ROOT = path.join(__dirname, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    makeMainWindow(RENDERER_DIST, VITE_DEV_SERVER_URL, preloadPath);
  }
});

app.whenReady().then(() => {
  ipcMain.handle('generate', handleGeminiGenerate);
  ipcMain.handle('hanSpell-check', handleHanSpellCheck);

  makeMainWindow(RENDERER_DIST, VITE_DEV_SERVER_URL, preloadPath);

  globalShortcut.register('CommandOrControl+Shift+D', () => {
    createQuickWindow(RENDERER_DIST, VITE_DEV_SERVER_URL, preloadPath);
    quickWin?.show();
    quickWin?.focus();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  try {
    ipcMain.removeHandler('generate');
    ipcMain.removeHandler('hanSpell-check');
  } catch (e) {
    console.error('electron quit error');
  }
});
