const Product = require('../models/product');

exports.getIndex =async (req, res, next) => {
 
  req.user.getProducts().then(products=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'home page',
      path: '/'
  })
}).catch(err=>console.log('something went wrong=',err))
  
};

exports.getProducts = async (req, res, next) => {
  req.user.getProducts().then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'productlist',
      path: '/products'
  })
}).catch(err=>console.log('something went wrong=',err))
  
};


exports.getProduct = (req, res, next) => {
  req.user.getProducts().then(products=>{
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'productlist',
      path: '/products'
  })
}).catch(err=>console.log('something went wrong=',err))
  
};
