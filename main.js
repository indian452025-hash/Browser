const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const path = require('path')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 1100,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      webviewTag: true
    }
  })

  mainWindow.loadFile('index.html')

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  const template = [
    {
      label: 'App',
      submenu: [
        { role: 'quit' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggledevtools' }
      ]
    }
  ]
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (mainWindow === null) createWindow()
})

// IPC: receive URL load requests from renderer (not strictly necessary with webview, but kept for extensibility)
ipcMain.on('navigate-to', (event, url) => {
  if (!mainWindow) return
  try {
    mainWindow.webContents.loadURL(url)
  } catch (err) {
    console.error('Failed to navigate:', err)
  }
})