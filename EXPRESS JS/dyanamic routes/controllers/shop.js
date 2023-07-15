const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  });
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart'
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};

exports.getProduct=(req,res,next)=>{
  Product.fetchAll(products=>{
  const id=req.params.productId;
  const item = products.find((item) => item.id === id);
  //console.log('item value=',Object.keys(item).length)
  res.render('shop/product-detail', {
    prods:item,
    path: '/product/'+id,
    pageTitle: 'Product Details'
  });
}) 
}

exports.getProductDetails = (req, res, next) => {
  Product.fetchAll(products=>{
  res.render('shop/product-detail', {
    prods:products,
    path: '/product/productid',
    pageTitle: 'Product Details'
  });
})
};