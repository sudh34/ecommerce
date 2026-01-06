// models/db.js
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = connection;
