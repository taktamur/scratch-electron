// Modules to control application life and create native browser window
import { app, BrowserWindow, ipcRenderer } from "electron";
import path from "path";

let windows: BrowserWindow[];
function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      // このへんの説明 https://akabeko.me/blog/2020/12/electron-12/
      nodeIntegration: false,
      contextIsolation: true,
      worldSafeExecuteJavaScript: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  return mainWindow;
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  windows = [createWindow(), createWindow()];

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const { ipcMain } = require("electron");

ipcMain.on("asynchronous-message", (event, arg) => {
  console.log("accept ping");
  const timestamp = new Date().getTime();
  const msg = "pong " + timestamp;
  console.log("response=" + msg);
  // イベント送信者に返事
  event.sender.send("asynchronous-reply", msg);
  // ブロードキャスト
  const msg2 = "broadcast " + timestamp;
  windows.forEach((w) => {
    w.webContents.send("broadcast", msg2);
  });
});
