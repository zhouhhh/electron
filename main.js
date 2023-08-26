const { app, BrowserWindow } = require('electron')

app.whenReady().then(() => {
    const mainWin = new BrowserWindow({
        width: 800,
        height: 600
    })

    mainWin.loadFile('index.html')

    mainWin.on('close', () => {
        console.log('close--');
    })
})

app.on('window-all-closed', () => {
    console.log('window-all-closed');
    app.quit()
})