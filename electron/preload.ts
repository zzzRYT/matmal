import { ipcRenderer, contextBridge } from 'electron';
import type { SpellCheckerApiResponse } from './services/schema';

declare global {
  interface Window {
    api: {
      generate: (opts: {
        sentence: string;
      }) => Promise<SpellCheckerApiResponse>;
      hanSpell: (opts: {
        sentence: string;
        weakOpt?: number;
      }) => Promise<SpellCheckerApiResponse>;
    };
  }
}

contextBridge.exposeInMainWorld('ipcRenderer', {
  on(...args: Parameters<typeof ipcRenderer.on>) {
    const [channel, listener] = args;
    return ipcRenderer.on(channel, (event, ...args) =>
      listener(event, ...args)
    );
  },
  off(...args: Parameters<typeof ipcRenderer.off>) {
    const [channel, ...omit] = args;
    return ipcRenderer.off(channel, ...omit);
  },
  send(...args: Parameters<typeof ipcRenderer.send>) {
    const [channel, ...omit] = args;
    return ipcRenderer.send(channel, ...omit);
  },
  invoke(...args: Parameters<typeof ipcRenderer.invoke>) {
    const [channel, ...omit] = args;
    return ipcRenderer.invoke(channel, ...omit);
  },
});

contextBridge.exposeInMainWorld('api', {
  generate: (opts: { sentence: string }) =>
    ipcRenderer.invoke('generate', opts),
  hanSpell: (opts: { sentence: string; weakOpt?: number }) =>
    ipcRenderer.invoke('hanSpell-check', opts),
});
