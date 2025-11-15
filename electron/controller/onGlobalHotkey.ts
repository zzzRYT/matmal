import path from 'node:path';
import { mainWin } from '../windows/mainWindow';
import { quickWin, createQuickWindow } from '../windows/quickWindow';
import { screen } from 'electron';
import { FRAME, RENDERER_DIST, VITE_DEV_SERVER_URL, DIRNAME } from '../paths';

export async function onGlobalHotkey() {
  try {
    if (!quickWin || quickWin.isDestroyed?.()) {
      try {
        const preloadPath = path.join(DIRNAME, 'preload.mjs');
        createQuickWindow(RENDERER_DIST, VITE_DEV_SERVER_URL, preloadPath);
      } catch (err) {
        console.warn('Failed to recreate quick window from controller', err);
      }
    }

    const point = screen.getCursorScreenPoint();

    if (quickWin) {
      try {
        quickWin.setPosition(
          point.x - FRAME.WIDTH,
          Math.max(30, point.y - FRAME.HEIGHT)
        );
        quickWin.show();
        quickWin.focus();
        quickWin.webContents.send('hotkey-pressed');
      } catch (err) {
        console.warn('Failed to update quickWin', err);
      }
    }

    // Also forward to main window
    if (mainWin) {
      try {
        mainWin.webContents.send('navigate-to', '/result');
      } catch (err) {
        console.warn('Failed to send to mainWin', err);
      }
    }
  } catch (err) {
    console.warn('onGlobalHotkey error', err);
  }
}
