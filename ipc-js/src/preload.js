const {contextBridge, ipcRenderer} = require('electron')

// contextBridge でレンダラープロセスのwindowオブジェクトに
// pingを飛ばす関数を足す
contextBridge.exposeInMainWorld('myAPI', {
  ping:()=>{
    console.log("send ping");
    ipcRenderer.send('asynchronous-message', 'ping');
  },
  pong:(func) => { // メインプロセスからの受信用
    console.log("receive pong");
    ipcRenderer.on('asynchronous-reply', (event, ...args) => func(...args));
  }
});


