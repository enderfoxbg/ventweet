const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Ventweet",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("https://x.com");

  mainWindow.webContents.on("did-finish-load", async () => {
    try {
      const cssPath = path.join(__dirname, "custom/inject.css");
      const jsPath = path.join(__dirname, "custom/inject.js");
      await mainWindow.webContents.insertCSS(fs.readFileSync(cssPath, "utf8"));
      await mainWindow.webContents.executeJavaScript(
        `try { ${fs.readFileSync(
          jsPath,
          "utf8"
        )} } catch(e) { console.error('Script error:', e); }`,
        true
      );
    } catch (err) {
      console.error("Injection error:", err);
    }
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
