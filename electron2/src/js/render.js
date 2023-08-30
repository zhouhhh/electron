const fs = require('fs')
const { ipcRenderer } = require('electron')

const holder = document.querySelector('#holder')
const readList = document.querySelector('#readList')
const btn = document.querySelector('#btn')
holder.addEventListener('drop', (e) => {
    e.preventDefault()//取消默认
    e.stopPropagation()//阻止冒泡
    // console.log(e, e.dataTransfer.files);
    for (const file of e.dataTransfer.files) {
        console.log('文件路径', file, file.path)
        fs.readFile(file.path, (err, data) => {
            // console.log('111', err, data);
            if (err) {
                console.log('Error', err);
            } else {
                const div = document.createElement('div');
                div.className = 'readFile'
                div.innerHTML = `
                    <h1>${file.name}</h1>
                    <pre>${data}</pre>
                `
                readList.appendChild(div)
            }
        })
    }
})
holder.addEventListener('dragover', (e) => {
    e.preventDefault()
    e.stopPropagation()
})

const webview = document.querySelector('#webview')

webview.addEventListener('did-start-loading', (e) => {
    console.log('webview加载中');
})
webview.addEventListener('did-stop-loading', (e) => {
    console.log('webview加载完成', [webview]);

    //修改webview内页面的样式
    webview.insertCSS(`#su{background:red !important;}`)

    //在webview內的页面执行js代码
    webview.executeJavaScript(`
        setTimeout(() => {
            const input = document.querySelector('#kw')
            const btn = document.querySelector('#su')
            input.value = 'electron'
            btn.click()
        }, 2000)
    `)
})
//渲染进程接收主进程的消息
ipcRenderer.on('main-send-message-to-second-window', (event, arg) => {
    console.log('渲染进程接收主进程的消息', event, arg)
})
//渲染进程给主进程发消息
ipcRenderer.send('second-window-send-message-to-main', '渲染进程给主进程发消息')

ipcRenderer.on('main-window-reply', (event, arg) => {
    console.log('主进程回复的消息', event, arg)
})

btn.onclick = function () {
    ipcRenderer.send('click-open-window')
}