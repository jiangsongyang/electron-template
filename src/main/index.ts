import { join } from 'node:path'
import { BrowserWindow, /* Menu, */ app, globalShortcut, ipcMain, shell } from 'electron'
import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
// import { getMenuTemplate } from './menuConfig'
import { workInMac } from './utils'

const setupMenu = () => {
  // const menu = Menu.buildFromTemplate(getMenuTemplate(app))
  // Menu.setApplicationMenu(menu)
}

const setupDevTools = (mainWindow: BrowserWindow) => {
  if (is.dev) mainWindow.webContents.openDevTools()
}

const setupShortcut = () => {
  // globalShortcut.register('CommandOrControl+s', () => {
  // todo
  // })
}

const setupHMR = (mainWindow: BrowserWindow) => {
  if (is.dev && process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    minWidth: 400,
    minHeight: 300,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  setupDevTools(mainWindow)
  setupHMR(mainWindow)
  setupMenu()
  setupShortcut()

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('will-quit', () => {
  globalShortcut.unregisterAll()
})

app.on('window-all-closed', () => {
  if (!workInMac()) {
    app.quit()
  }
})

ipcMain.on('quit-app', () => {
  app.quit()
})
