const { ipcRenderer } = require('electron')

// window.addEventListener('DOMContentLoaded', () => {
//点击按钮打开一个新窗口
const oBtn = document.getElementById('btn')
oBtn.addEventListener('click', () => {
    ipcRenderer.send('openWindow', 1112)
})
// })