import { dialog } from 'electron';

import { createQuickWindow, quickWin } from '../windows/quickWindow';
import { getSelectedText } from '../services/copy/selectedText';

import { PRELOAD_PATH, RENDERER_DIST, VITE_DEV_SERVER_URL } from '../paths';

export const handleCopyText = async () => {
  try {
    if (quickWin && !quickWin.isDestroyed()) {
      quickWin.hide();
    }
    const selectedText = await getSelectedText();
    if (selectedText && selectedText.trim().length > 0) {
      if (!quickWin || quickWin.isDestroyed()) {
        createQuickWindow(RENDERER_DIST, VITE_DEV_SERVER_URL, PRELOAD_PATH);
        quickWin!.webContents.once('did-finish-load', () => {
          quickWin?.webContents.send('quick-selection', selectedText);
        });
      } else {
        quickWin.webContents.send('quick-selection', selectedText);
      }
    }
    quickWin?.on('ready-to-show', () => {
      quickWin?.show();
      quickWin?.focus();
    });
  } catch (error) {
    console.log(error);
    dialog.showErrorBox(
      '오류',
      '텍스트를 가져오는 데 실패했습니다. 앱에 "손쉬운 사용" 권한이 부여되었는지 확인해주세요.'
    );
  }
};
