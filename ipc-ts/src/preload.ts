import { contextBridge, ipcRenderer } from "electron";
import MyAPI, { BroadcastFn, PongFn } from "./myAPI";

// contextBridge でレンダラープロセスのwindowオブジェクトに
// pingを飛ばす関数を足す
const myAPI: MyAPI = {
  ping: () => {
    console.log("send ping");
    ipcRenderer.send("asynchronous-message", "ping");
  },
  pong: (fn: PongFn) => {
    // メインプロセスからの受信用
    console.log("receive pong");
    ipcRenderer.on("asynchronous-reply", (event, msg) => fn(msg));
  },
  // ブロードキャストを受け取る
  broadcast: (fn: BroadcastFn) => {
    console.log("receive broadcast");
    ipcRenderer.on("broadcast", (event, msg) => fn(msg));
  },
};
contextBridge.exposeInMainWorld("myAPI", myAPI);
