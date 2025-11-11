import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exec } from 'child_process';
import {
  app,
  BrowserWindow,
  ipcMain,
  Tray,
  screen,
  globalShortcut,
  nativeImage,
  clipboard,
} from 'electron';

import { handleGeminiGenerate } from './controller/gemini';
import { handleHanSpellCheck } from './controller/hanSpell';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public')
  : RENDERER_DIST;

let mainWin: BrowserWindow | null;
let quickWin: BrowserWindow | null;
let tray: Tray | null;

const FRAME = {
  WIDTH: 1000,
  HEIGHT: 750,
};

function createMainWindow() {
  mainWin = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, 'electron-vite.svg'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
    },
    width: FRAME.WIDTH,
    height: FRAME.HEIGHT,
  });

  // Test active push message to Renderer-process.
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
  ipcMain.handle('capture-selection', async () => {
    return await captureSelectionViaCopy();
  });

  if (VITE_DEV_SERVER_URL) {
    mainWin.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // win.loadFile('dist/index.html')
    mainWin.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

/**
 * Try to capture the current selection by simulating a copy operation,
 * then read the clipboard. On macOS this uses AppleScript to send Cmd+C.
 * Falls back to reading the clipboard directly (if user already copied).
 */
async function captureSelectionViaCopy(timeout = 200) {
  const platform = process.platform;
  try {
    if (platform === 'darwin') {
      // send Cmd+C to the frontmost app via AppleScript
      // This requires that the frontmost app accepts Cmd+C for copy.
      await new Promise<void>((resolve, reject) => {
        exec(
          'osascript -e \'tell application "System Events" to keystroke "c" using {command down}\'',
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );
      });
      // wait a short moment for clipboard to update
      await new Promise((r) => setTimeout(r, timeout));
      return clipboard.readText();
    }

    // On Windows/Linux we attempt to read clipboard directly (user should copy first)
    return clipboard.readText();
  } catch (err) {
    console.warn('captureSelectionViaCopy failed', err);
    return clipboard.readText();
  }
}

export function onGlobalHotkey() {
  // If the quick window was closed/destroyed, recreate it before use.
  if (!quickWin || quickWin.isDestroyed()) {
    try {
      createQuickWindow();
    } catch (err) {
      console.warn('Failed to recreate quick window', err);
      return;
    }
  }

  if (!quickWin) return;
  if (quickWin.isDestroyed()) return;

  const wasVisible = quickWin.isVisible();

  // capture selection (try to simulate copy) and then show/refresh quick window
  (async () => {
    try {
      const text = await captureSelectionViaCopy();
      // 옵션: 마우스 근처에 띄우기
      const point = screen.getCursorScreenPoint();

      if (!wasVisible) {
        try {
          quickWin.setPosition(point.x - 240, Math.max(30, point.y - 100)); // center-ish
        } catch (err) {
          console.warn('Failed to set quick window position', err);
        }
        try {
          quickWin.show();
          quickWin.focus();
        } catch (err) {
          console.warn('Failed to show/focus quick window', err);
        }
      } else {
        // already visible: bring to front
        try {
          quickWin.focus();
        } catch (err) {
          console.warn('Failed to focus quick window', err);
        }
      }

      // send selection-text to quickWin (if present)
      try {
        const wc = quickWin?.webContents;
        if (wc && !wc.isDestroyed && !wc.isDestroyed()) {
          wc.send('hotkey-pressed');
          wc.send('selection-text', text);
        }
      } catch (err) {
        console.warn('Failed to send IPC to quick window', err);
      }

      // also forward selection-text to main window so SpellChecker there
      // receives the text and can run immediately
      try {
        const mw = mainWin?.webContents;
        if (mw && !mw.isDestroyed && !mw.isDestroyed()) {
          // navigate main window to result page and send the selection
          mw.send('navigate-to', '/result');
          mw.send('selection-text', text);
        }
      } catch (err) {
        console.warn('Failed to send IPC to main window', err);
      }
    } catch (err) {
      console.warn('onGlobalHotkey failed', err);
    }
  })();
}

function createQuickWindow() {
  quickWin = new BrowserWindow({
    width: FRAME.WIDTH,
    height: FRAME.HEIGHT,
    show: false,
    frame: true,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
    },
  });
  quickWin.on('closed', () => {
    quickWin = null;
  });
  // load quick UI route
  if (VITE_DEV_SERVER_URL) {
    // Dev server: navigate directly to the quick route
    quickWin.loadURL(`${VITE_DEV_SERVER_URL}quick`);
  } else {
    // Production: load index.html then ask renderer to navigate to /quick
    quickWin.loadFile(path.join(RENDERER_DIST, 'index.html'));
    quickWin.webContents.once('did-finish-load', () => {
      quickWin?.webContents.send('navigate-to', '/quick');
    });
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    mainWin = null;
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
    createQuickWindow();
  }
});

app.whenReady().then(() => {
  createMainWindow();
  createQuickWindow();

  const accelerator = 'CommandOrControl+D+D';
  const ok = globalShortcut.register(accelerator, () => {
    // Called when user presses the global hotkey
    onGlobalHotkey();
  });
  if (!ok) {
    console.warn('Global hotkey registration failed for', accelerator);
    // Optionally inform renderer or log
  }

  // create tray (optional) to keep app running in background
  const icon = nativeImage.createFromPath(
    path.join(__dirname, '..', 'icon.png')
  );
  tray = new Tray(icon);
  tray.setToolTip('My Spell App');
  tray.on('double-click', () => {
    if (mainWin) mainWin.show();
  });
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});
