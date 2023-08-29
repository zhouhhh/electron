const fs = require('fs')

const holder = document.querySelector('#holder')
const readList = document.querySelector('#readList')
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