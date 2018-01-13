const { app, BrowserWindow } = require('electron');
const reload = require('electron-reload');
const isDev = require('electron-is-dev');
const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// reload in dev
if (isDev) {
  reload(__dirname, { electron: path.join(__dirname, "node_modules", ".bin", "electron") });
}

function createWindow () {
  win = new BrowserWindow({
		width: 500,
		height: 800,
		//titleBarStyle: 'hidden',
		transparent: true,
		//toolbar: false,
		frame: false,
		//icon: path.join(__dirname, 'assets/icons/png/64x64.png')
	})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  //win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
