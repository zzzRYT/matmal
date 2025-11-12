import { exec } from 'child_process';
import { clipboard } from 'electron';

export async function captureSelectionViaCopy(timeout = 200) {
  const platform = process.platform;
  try {
    // MacOS
    if (platform === 'darwin') {
      await new Promise<void>((resolve, reject) => {
        exec(
          `osascript -e 'tell application "System Events" to keystroke "c" using {command down}'`,
          (err) => {
            if (err) return reject(err);
            resolve();
          }
        );
      });
      await new Promise((r) => setTimeout(r, timeout));
      return clipboard.readText();
    }
    // Window,Linux
    return clipboard.readText();
  } catch (err) {
    console.warn('captureSelectionViaCopy failed', err);
    return clipboard.readText();
  }
}
