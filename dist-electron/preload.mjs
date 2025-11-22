"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(channel, (event, ...args2) => listener(event, ...args2));
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
});
electron.contextBridge.exposeInMainWorld("api", {
  generate: (opts) => electron.ipcRenderer.invoke("generate", opts),
  hanSpell: (opts) => electron.ipcRenderer.invoke("hanSpell-check", opts),
  onNavigate: (path) => electron.ipcRenderer.invoke("navigate", path),
  openSetting: () => electron.ipcRenderer.invoke("setting-open"),
  getAppVersion: () => electron.ipcRenderer.invoke("get-app-version")
});
electron.contextBridge.exposeInMainWorld("theme", {
  changeTheme: (mode) => electron.ipcRenderer.invoke("theme-mode", mode),
  getTheme: () => electron.ipcRenderer.invoke("get-theme")
});
