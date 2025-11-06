import { ElectronAPI } from '@electron-toolkit/preload'

interface API {
  gemini: {
    generate: (opts: { contents: string }) => Promise<string>
  }
}
declare global {
  interface Window {
    electron: ElectronAPI
    api: API
  }
}
