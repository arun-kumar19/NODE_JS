const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([rows,filedata])=>{
    res.render('shop/index', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/'
    });
  }
  ).catch(err=>{
    console.log(err);
  })
}
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

exports.getProduct=async (req,res,next)=>{
  const id=req.params.productId;
  try{
    const product=await Product.findByPk(id);
    
  res.render('shop/product-detail', {
    prods:product,
    path: '/product/'+id,
    pageTitle: 'Product Details'
  });
}catch(error){
  console.log('error fetching data=',err);
}

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


exports.postCart = (req, res, next) => {
  const productId=req.body.productId;
  Product.findById(productId,product=>{

    //console.log('price=',product.price);
    
    Cart.addProduct(productId,product.price);

  })
 
res.render('shop/cart', {
  path: '/cart',
  pageTitle: 'Your Cart'
});
};




exports.getProducts=async function getProducts() {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    throw error;
  }
} 
