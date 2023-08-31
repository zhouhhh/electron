const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

//监听渲染进程发送过来的second-window-send-message-to-main事件
ipcMain.on('second-window-send-message-to-main', (event, arg) => {
  console.log('2323', event, arg);
  event.reply('main-window-reply', '这是主进程发来的消息')
})

//监听渲染进程打开新窗口
ipcMain.on('click-open-window', (event, arg) => {
  cWindow()
})

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const cWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'list.html'));
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
      webviewTag: true
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  setTimeout(() => {
    //主进程主动给渲染进程发消息
    mainWindow.webContents.send('main-send-message-to-second-window', '主进程主动给渲染进程发消息');

    //openFile允许选择文件
    //openDirectory允许选择文件夹
    //multiSelections允许多选
    //showHiddenFiles显示隐藏文件
    //createDirectory允许创建文件夹
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections']
    }).then((result) => {
      console.log(result.filePaths, result.canceled);
    })
  }, 2000)

  mainWindow.on('close', (e) => {
    e.preventDefault()
    dialog.showMessageBox(mainWindow, {
      type: 'warning',
      title: '关闭',
      message: '是否要关闭窗口？',
      buttons: ['取消', '残忍关闭']
    }).then((index) => {
      console.log('index', index);
      if (index.response == 1) {
        // mainWindow = null
        app.exit()
        // mainWindow.close()
      }
    })
  })
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
