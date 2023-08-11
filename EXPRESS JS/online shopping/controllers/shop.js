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


exports.getCart = (req, res, next) => {
  req.user.getCart().then(cart=>{
    return cart.getProducts().then(cartproducts=>{
      //console.log('added product=',cartproducts);
  res.render('shop/cart', {
      prods: cartproducts,
      pageTitle: 'cart',
      path: '/cart'
  })
}).catch(err=>console.log(err));
})
}
//).catch(err=>console.log('something went wrong=',err))
//}
  
exports.postCart=(req,res,next)=>{
  let fetchedCart;
  const productid=req.params.prodid;
  //console.log('product id=',productid);
req.user.getCart().then(cart=>{
  fetchedCart=cart;
return cart.getProducts({where :{  id:productid} })
}).then(products=>{
  let product;
  if(products.length>0){
    product=products[0];
  }

  let newQuantity=1;

  if(product){
    product.cartitem.quantity=product.cartitem.quantity+1;
    product.cartitem.save();
    return res.redirect('/cart');
  }

  Product.findByPk(productid).then(product=>{
  fetchedCart.addProduct(product,{through:{quantity:newQuantity}})
  return res.redirect('/cart');
}).catch(err=>console.log('something went wrong=',err))

}).catch(err=>console.log('soemthing went wrong2=',err))

}

exports.deleteCartITem=async (req,res,next)=>{
  let productid=req.params.prodid;
  console.log('hello from server=',productid);
  req.user.getCart().then(cart=>{
   // console.log('cart=',cart);
    cart.getProducts({where :{
    id:productid
    }}).then(product=>{
      cart.removeProduct(product).then(result=>{
      console.log('Result=',result);
      if(result){
        req.user.getCart().then(cart=>{
          console.log('updatd cart=',cart);
          cart.getProducts().then(products=>{
            console.log('updated products=',products);
            if(products.length==0){
              return res.json({message:'cart is emptry'});
            }
            else{
          res.json(products);
            }
          })
        })
      }
    }).catch(err=>{
         console.log('something went wrong=',err);
      })
      
    }).catch(err=>console.log('error during fetching data=',err))

  }).catch(err=>console.log('error fetching cart=',err));

}

exports.loadCart = (req, res, next) => {
console.log('hello');
 return res.redirect('/cart');
}