const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const mainWin = new BrowserWindow({
        width: 800,
        height: 600
    })

    mainWin.loadFile('index.html')

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