const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const db = require('./db/database');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('./renderer/index.html');
}

app.whenReady().then(() => {
  db.init(); // cria tabela se não existir
  createWindow();
});

ipcMain.handle('get-products', () => {
  return db.getAllProducts();
});

ipcMain.handle('add-product', (event, product) => {
  return db.addProduct(product);
});
