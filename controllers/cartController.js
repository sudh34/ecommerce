const Product = require('../models/productModel');

exports.showCart = (req, res) => {
  const cart = req.session.cart || [];
  res.render('pages/cart', { cart });
};

exports.addToCart = (req, res) => {
  const productId = parseInt(req.params.id);
  const quantity = parseInt(req.body.quantity) || 1;

  Product.getProductById(productId, (err, product) => {
    if(err || product.length === 0) return res.send('Product not found');

    const cart = req.session.cart || [];
    const index = cart.findIndex(item => item.id === productId);

    if(index >= 0){
      cart[index].quantity += quantity;
    } else {
      cart.push({ id: product[0].id, name: product[0].name, price: product[0].price, quantity });
    }

    req.session.cart = cart;
    res.redirect('/cart');
  });
};

exports.removeFromCart = (req, res) => {
  const productId = parseInt(req.params.id);
  let cart = req.session.cart || [];
  cart = cart.filter(item => item.id !== productId);
  req.session.cart = cart;
  res.redirect('/cart');
};
