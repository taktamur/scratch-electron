const {contextBridge, ipcRenderer} = require('electron')

// contextBridge でレンダラープロセスのwindowオブジェクトに
// pingを飛ばす関数を足す
contextBridge.exposeInMainWorld('myAPI', {
  ping:async()=>{
    console.log("send ping");
    await ipcRenderer.send('asynchronous-message', 'ping');
  }
});


