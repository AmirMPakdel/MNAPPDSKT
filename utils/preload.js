const { contextBridge, ipcRenderer } = require('electron')

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

contextBridge.exposeInMainWorld('electronAPI',{
  
  failedConnection: (callback) => ipcRenderer.on('failed_connection', callback),
  retryConnection: () => ipcRenderer.invoke('retry_connection'),
  //openFile: () => ipcRenderer.invoke('dialog:openFile'),
  //handleCounter: (callback) => ipcRenderer.on('update-counter', callback),
})

window.addEventListener('DOMContentLoaded', () => {
  
})