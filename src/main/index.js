import { app, BrowserWindow,ipcMain  } from 'electron'
const ipc = ipcMain
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000,
    minWidth: 840,
    minHeight: 570,
    // fullscreen: true,
    frame: false,
    webPreferences: {
      /*preload: path.join(__dirname, 'preload.js')*/
      nodeIntegration: true
    },
  })

  mainWindow.loadURL(winURL)
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

// //登录窗口最小化
// ipc.on('min',function(){
//   mainWindow.minimize();
// })
// //登录窗口最大化
// ipc.on('max',function(){
//   if(mainWindow.isMaximized()){
//       mainWindow.restore();  
//   }else{
//       mainWindow.maximize(); 
//   }
// })
ipc.on('close',function(){
  mainWindow.close();
})

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
