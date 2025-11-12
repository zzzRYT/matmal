import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { app, Tray, globalShortcut, nativeImage } from 'electron';

import {
  createMainWindow as makeMainWindow,
  mainWin,
} from './windows/mainWindow';
import { createQuickWindow as makeQuickWindow } from './windows/quickWindow';
import { onGlobalHotkey } from './controller/onGlobalHotkey';

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

// mainWin and quickWin are created in their respective modules
let tray: Tray | null;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS re-create windows when the dock icon is clicked and there are no open windows.
  if (makeMainWindow && makeQuickWindow) {
    makeMainWindow(RENDERER_DIST, VITE_DEV_SERVER_URL);
    makeQuickWindow(RENDERER_DIST, VITE_DEV_SERVER_URL);
  }
});

app.whenReady().then(() => {
  makeMainWindow(RENDERER_DIST, VITE_DEV_SERVER_URL, preloadPath);
  makeQuickWindow(RENDERER_DIST, VITE_DEV_SERVER_URL, preloadPath);

  const accelerator = 'CommandOrControl+D+D';
  const ok = globalShortcut.register(accelerator, () => {
    onGlobalHotkey();
  });
  if (!ok) {
    console.warn('Global hotkey registration failed for', accelerator);
  }

  // create tray (optional) to keep app running in background
  const icon = nativeImage.createFromPath(
    path.join(__dirname, '..', 'icon.png')
  );
  tray = new Tray(icon);
  tray.setToolTip('My Spell App');
  tray.on('double-click', () => {
    if (mainWin) mainWin?.show();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
