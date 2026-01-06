const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', cartController.showCart);
router.post('/add/:id', cartController.addToCart);
router.get('/remove/:id', cartController.removeFromCart);

module.exports = router;
