const { remote } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
    //点击按钮打开一个新窗口
    const oBtn = document.getElementById('btn')
    oBtn.addEventListener('click', () => {
        let indexMain = new remote.BrowserWindow({
            width: 200,
            height: 200
        })
        indexMain.loadFile('list.html')

        indexMain.on('close', () => {
            indexMain = null
        })
    })
})