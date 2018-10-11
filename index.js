const { app, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + '/preload.js'
    }
  })

  win.setPosition(0, 0)

  win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`)
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
      app.quit()
  }
});

app.on('activate', function () {
  if (win === null) {
      createWindow()
  }
});