export function getCopyCommand() {
  switch (process.platform) {
    // macOS
    case 'darwin':
      return 'osascript -e \'tell application "System Events" to keystroke "c" using {command down} \'';

    // windows
    case 'win32':
      return `powershell.exe -ExecutionPolicy Bypass -Command "$wshell = New-Object -ComObject WScript.Shell; $wshell.SendKeys('^c')"`;

    // Linux
    // 주의: xdotool이 시스템에 설치되어 있어야 작동합니다.
    case 'linux':
      return `xdotool key control+c`;

    default:
      console.warn(`Unsupported platform: ${process.platform}`);
      return '';
  }
}
