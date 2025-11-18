import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { app, globalShortcut, ipcMain, BrowserWindow } from 'electron';
import { createRequire } from 'module';
import dotenv from 'dotenv';

import {
  mainWin,
  createMainWindow as makeMainWindow,
} from './windows/mainWindow';
import { handleGeminiGenerate } from './controller/gemini';
import { handleHanSpellCheck } from './controller/hanSpell';
import { handleNavigate } from './controller/navigate';
import { PRELOAD_PATH } from './paths';
import { handleCopyText } from './controller/copy';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

process.env.APP_ROOT = path.join(__dirname, '..');

const resolveEnvPath = (): string | null => {
  if (process.env.NODE_ENV === 'development') {
    return path.join(process.env.APP_ROOT || __dirname, '.env');
  }

  const candidates = [
    path.join(process.resourcesPath, 'app', '.env'),
    path.join(process.resourcesPath, '.env'),
    path.join(process.resourcesPath, 'app.asar', '.env'),
  ];

  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return p;
    } catch (e) {
      console.log('[main] Error checking .env path:', p, e);
    }
  }

  return null;
};

const _envPath = resolveEnvPath();
if (_envPath) {
  try {
    dotenv.config({ path: _envPath });
  } catch (e) {
    console.warn('[main] Failed to load .env from', _envPath, e);
  }
} else {
  console.warn('[main] No .env found in any candidate path.');
}

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
    makeMainWindow(RENDERER_DIST, VITE_DEV_SERVER_URL, PRELOAD_PATH);
    mainWin?.on('ready-to-show', () => {
      mainWin?.show();
      mainWin?.focus();
    });
  }
});

try {
  const require = createRequire(import.meta.url);
  const squirrel = require('electron-squirrel-startup');
  if (squirrel) app.quit();
} catch (e) {
  console.error('squirrel startup error:', e);
}

app.whenReady().then(() => {
  ipcMain.handle('generate', handleGeminiGenerate);
  ipcMain.handle('hanSpell-check', handleHanSpellCheck);

  ipcMain.handle('navigate', handleNavigate);

  makeMainWindow(RENDERER_DIST, VITE_DEV_SERVER_URL, PRELOAD_PATH);
  mainWin?.on('ready-to-show', () => {
    mainWin?.show();
    mainWin?.focus();
  });

  globalShortcut.register('CommandOrControl+Shift+D', handleCopyText);
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
  try {
    ipcMain.removeHandler('generate');
    ipcMain.removeHandler('hanSpell-check');
    ipcMain.removeHandler('navigate');
  } catch (e) {
    console.error('electron quit error');
  }
});
