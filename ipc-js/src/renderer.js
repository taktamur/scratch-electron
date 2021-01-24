// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// ここはレンダラープロセスの世界なので、nodeのモジュールの
// requireは失敗する。なのでwindowオブジェクト経由でping()関数を呼び出す
// pingボタンのイベント登録
const asyncMsgBtn = document.getElementById('async-msg')
asyncMsgBtn.addEventListener('click', () => {
  console.log("click");
  window.myAPI.ping();
})
