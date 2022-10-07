const { contextBridge, ipcRenderer } = require('electron')

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

contextBridge.exposeInMainWorld('electronAPI',{
  
  failedConnection: (callback) => ipcRenderer.on('splash:failed_connection', callback),
  retryConnection: () => ipcRenderer.invoke('splash:retry_connection'),
  showUpdateModal: (callback) => ipcRenderer.on("splash:show_update_modal", callback),
  opUpdateUrl: (url) => ipcRenderer.invoke('splash:open_update_url', url),
  continueWithoutUpdate: () => ipcRenderer.invoke('splash:continue_without_update'),
  
})

window.addEventListener('DOMContentLoaded', () => {
  
})