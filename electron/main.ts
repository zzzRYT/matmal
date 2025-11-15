import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { app, globalShortcut } from 'electron';

import { createMainWindow as makeMainWindow } from './windows/mainWindow';
import { quickWin } from './windows/quickWindow';
import { createQuickWindow } from './windows/quickWindow';
import { DIRNAME } from './paths';

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
  // On macOS re-create windows when the dock icon is clicked and there are no open windows.
  if (makeMainWindow) {
    makeMainWindow(RENDERER_DIST, VITE_DEV_SERVER_URL);
  }
});

app.whenReady().then(() => {
  makeMainWindow(RENDERER_DIST, VITE_DEV_SERVER_URL, preloadPath);

  globalShortcut.register('CommandOrControl+Shift+D', () => {
    const preloadPath = path.join(DIRNAME, 'preload.mjs');
    createQuickWindow(RENDERER_DIST, VITE_DEV_SERVER_URL, preloadPath);
    quickWin?.show();
    quickWin?.focus();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
