const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');

const createWindow = () => {
    let mainWin = new BrowserWindow({
        x: 100,
        y: 100,//设置窗口显示的位置，相对于屏幕的左上角
        show: false,//默认创建一个窗口对象之后就会显示，设置为false就不会显示了
        width: 800,
        height: 600,
        maxHeight: 800,
        maxWidth: 1000,
        minHeight: 400,
        minWidth: 600,//可以设置窗口的最大最小宽高
        resizable: true,//是否允许缩放应用的窗口大小
        icon: path.join(__dirname, 'favicon.ico'),//可以设置图标
        title: '学习Electron',//这里的title要生效要先删除index.html的title
        frame: true,//自定义menu，设置为false，不显示title
        autoHideMenuBar: true,
        // transparent: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,//配置这三个主要是为了能在index.js(即渲染进程)中使用node语法，不然用require引入会报错
        }
    })

    mainWin.loadFile('index.html')

    //自动打开 DevTools
    mainWin.webContents.openDevTools();

    //默认不显示窗体，等内容加载后在显示窗口
    mainWin.on('ready-to-show', () => {
        mainWin.show()
    })
    mainWin.webContents.on('did-finish-load', () => {
        console.log('33333--->did-finish-load');
    })
    mainWin.webContents.on('dom-ready', () => {
        console.log('22222--->dom-ready');
    })

    mainWin.on('close', () => {
        console.log('8888--->this window is closed');
        mainWin = null
    })
}

// app.whenReady().then(() => {
//     const mainWin = new BrowserWindow({
//         width: 800,
//         height: 600
//     })

//     mainWin.loadFile('index.html')

//     mainWin.on('close', () => {
//         console.log('close--');
//         mainWin = null
//     })
// })
app.on('ready', () => {
    console.log('1111--->ready');
    createWindow()
    //点击按钮打开新页面
    ipcMain.on('openWindow', () => {
        let indexMain = new BrowserWindow({
            width: 200,
            height: 200
        })
        indexMain.loadFile('list.html')

        indexMain.on('close', () => {
            indexMain = null
        })
    })
})

app.on('window-all-closed', () => {
    console.log('444444--->window-all-closed');
    app.quit()
})

app.on('before-quit', () => {
    console.log('55555--->before-quit');
})
app.on('will-quit', () => {
    console.log('666666--->will-quit');
})
app.on('quit', () => {
    console.log('77777--->quit');
})