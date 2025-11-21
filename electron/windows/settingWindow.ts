import { BrowserWindow } from 'electron';
import { FRAME } from './constants';
import { VITE_DEV_SERVER_URL } from '../paths';

export let settingWin: BrowserWindow | null = null;

export function createSettingWindow() {
  settingWin = new BrowserWindow({
    width: FRAME.QUICK.WIDTH,
    height: FRAME.QUICK.HEIGHT,
  });

  settingWin.on('closed', () => {
    settingWin = null;
  });

  if (VITE_DEV_SERVER_URL) {
    const target = `${VITE_DEV_SERVER_URL.replace(/\/$/, '')}/#${'/settings'}`;
    settingWin.loadURL(target);
  } else {
    settingWin.loadFile('index.html');
    settingWin.webContents.once('did-finish-load', () => {
      settingWin?.webContents.send('navigate-to', '/settings');
    });
  }

  return settingWin;
}
