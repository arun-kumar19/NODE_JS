
const { json } = require('body-parser');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add/Edit Product',
    path: '/admin/add-product',
    editMode:false,
  });
  
};

exports.getEditProduct = (req, res, next) => {
const editMode=req.query.edit;
const prodid=req.params.prodId;
//console.log('is editmode=',editMode);
//console.log(req.params.prodId)
if(!editMode){
  req.user.getProducts({where:{
    id:prodid
  }
  }).then(product=>{
      res.render('admin/edit-product', {
        pageTitle: 'add Product',
        path: '/admin/add-product',
        editMode:false,
        product:product,
      })
    }).catch('eror while fetching id')
}    
  req.user.getProducts({
    where:{
      id:prodid
    }
  }).then(product=>{
    console.log('fetched data=',product[0].id)
  res.render('admin/edit-product', {
    pageTitle: 'edit Product',
    path: '/admin/edit-product',
    editMode:editMode,
    product:product[0],
  })
  }).catch(err=>console.log('error 2=',err));

};

exports.postAddProduct = (req, res, next) => {
  console.log('test=',req.user)
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
    })
    .then(result => {
      // console.log(result);
      console.log('Created Product');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProducts = async (req, res, next) => {

  req.user.getProducts().then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
  })
}).catch(err=>console.log('something went wrong=',err))
  
};

exports.postEditProduct = (req, res, next) => {
  const editProductId=req.body.productId;
  Product.findByPk(editProductId).
  then(product=>{
    product.title=req.body.title;
    product.imageUrl=req.body.imageUrl;
    product.price=req.body.price;
    product.description=req.body.description;
    product.save();
      res.redirect('/admin/products') 
})
.catch(err=>console.log('abc=',err));
};


exports.deleteProduct=async (req,res,next)=>{

  const prodid=req.params.prodId;

 const product=await Product.findByPk(prodid)

    if(!product){
  return       console.log('something went wrong');
    }
    await product.destroy()
      console.log('product deleted successfully=',product);
      res.redirect('/admin/products');
    
}