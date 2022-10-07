const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const Splash = require('./pages/splash')


const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1024,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'utils/preload.js'),
      nodeIntegration:false,
    }
  })

  let splash_page = new Splash(mainWindow, "splash");
  splash_page.load();

  setTimeout(()=>{
    mainWindow.webContents.send("failed_connection");
  }, 2000);


  // setInterval(()=>{
  //   console.log("update-counter");
  //   mainWindow.webContents.send('update-counter', counter)
  // }, 5000);

  // Open the DevTools.
  mainWindow.webContents.openDevTools({mode:"detach"})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {

  createWindow();

  ipcMain.handle("retry_connection", ()=>{
    console.log("retrying connection!");
  });

  // ipcMain.handle('dialog:openFile', ()=>{
  //   console.log("hi");
  // });

  // ipcMain.on('counter-value', (_event, value) => {
  //   counter = value;
  //   onsole.log(counter) // will print value to Node console
  // })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})