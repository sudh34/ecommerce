const db = require('./db');

exports.getAllProducts = (callback) => {
  db.query('SELECT * FROM products', callback);
};

exports.getProductById = (id, callback) => {
  db.query('SELECT * FROM products WHERE id = ?', [id], callback);
};
