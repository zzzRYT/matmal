import path from 'node:path';

import { BrowserWindow, screen } from 'electron';
import { FRAME } from './constants';
import { PRELOAD_PATH, RENDERER_DIST, VITE_DEV_SERVER_URL } from '../paths';

export let settingWin: BrowserWindow | null = null;

export function createSettingWindow() {
  const { x, y } = screen.getCursorScreenPoint();
  settingWin = new BrowserWindow({
    x,
    y,
    resizable: false,
    show: false,
    frame: false,
    width: FRAME.QUICK.WIDTH,
    height: FRAME.QUICK.HEIGHT,
    webPreferences: {
      preload: PRELOAD_PATH ?? path.join(RENDERER_DIST, 'preload.mjs'),
      contextIsolation: true,
    },
  });

  settingWin.on('blur', () => {
    if (!settingWin) return;
    if (!settingWin.webContents.isDevToolsOpened()) {
      settingWin.hide();
    }
  });

  settingWin.on('closed', () => {
    settingWin = null;
  });

  if (VITE_DEV_SERVER_URL) {
    const target = `${VITE_DEV_SERVER_URL.replace(/\/$/, '')}/#${'/setting'}`;
    settingWin.loadURL(target);
  } else {
    settingWin.loadFile('index.html');
    settingWin.webContents.once('did-finish-load', () => {
      settingWin?.webContents.send('navigate-to', '/setting');
    });
  }

  return settingWin;
}
