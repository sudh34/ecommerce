const db = require('../models/db');

exports.showHome = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM tbl_products');

    res.render('pages/index', {
      products: results
    });

  } catch (err) {
    console.error('Database query error:', err);
    return res.send('Database error');
  }
};
