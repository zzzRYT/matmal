import { exec } from 'child_process';
import { clipboard, dialog, systemPreferences } from 'electron';
import { quickWin } from '../../windows/quickWindow';
import { getCopyCommand } from './script';

export async function getSelectedText(): Promise<string> {
  const isTrusted = systemPreferences.isTrustedAccessibilityClient(false);

  if (!isTrusted) {
    const { response } = await dialog.showMessageBox(quickWin!, {
      type: 'info',
      title: '권한 필요',
      message: '선택한 텍스트를 가져오려면 "손쉬운 사용" 권한이 필요합니다.',
      detail:
        '"시스템 설정 열기"를 클릭하여 "개인정보 보호 및 보안 > 손쉬운 사용"에서 저희 앱을 활성화해주세요.',
      buttons: ['시스템 설정 열기', '나중에'],
      defaultId: 0,
    });

    if (response === 0) {
      systemPreferences.isTrustedAccessibilityClient(true);
    }
    return '';
  }

  return new Promise((resolve, reject) => {
    const previousContent = clipboard.readText();

    exec(getCopyCommand(), (error) => {
      if (error) {
        clipboard.writeText(previousContent);
        return reject(error);
      }
      setTimeout(() => {
        const selectedText = clipboard.readText();
        clipboard.writeText(previousContent);
        resolve(selectedText);
      }, 150);
    });
  });
}
