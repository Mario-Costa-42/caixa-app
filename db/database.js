const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'caixa.sqlite'));

function init() {
  db.prepare(`
    CREATE TABLE IF NOT EXISTS produtos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      preco REAL NOT NULL
    )
  `).run();
}

function addProduct({ nome, preco }) {
  const stmt = db.prepare('INSERT INTO produtos (nome, preco) VALUES (?, ?)');
  stmt.run(nome, preco);
  return true;
}

function getAllProducts() {
  return db.prepare('SELECT * FROM produtos').all();
}

module.exports = { init, addProduct, getAllProducts };
