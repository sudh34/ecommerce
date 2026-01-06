const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', (req, res) => {
  // If user is not logged in, redirect to login
  if(!req.session.user){
    return res.redirect('/auth/login');
  }
  // Otherwise, show landing page
  productController.showHome(req, res);
});

module.exports = router;
