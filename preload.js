const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('ventweet', {
    isElectron: true
});