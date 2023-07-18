
const { json } = require('body-parser');
const Product = require('../models/product');
const fs=require("fs");

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editMode:false,
  });
};


exports.getEditProduct = (req, res, next) => {
const editMode=req.query.edit;
const id=req.params.prodId;
//console.log('is editmode=',editMode);
//console.log(req.params.prodId)
if(!editMode){
  Product.findById(id,product=>{
      res.render('admin/edit-product', {
        pageTitle: 'add Product',
        path: '/admin/add-product',
        editMode:false,
        product:product,
      })
    })
}
  Product.findById(id,product=>{
//    console.log(product);
  res.render('admin/edit-product', {
    pageTitle: 'edit Product',
    path: '/admin/edit-product',
    editMode:editMode,
    product:product,
  });
})
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const editProductId=req.body.productId;  
  const editedProduct={
    id:editProductId,
    title:req.body.title,
    imageUrl:req.body.imageUrl,
    price:req.body.price,
    description:req.body.description,
  }
  console.log(editedProduct);
  Product.updateProduct(editProductId,editedProduct);
  res.redirect('/admin/products');

};


exports.deleteProduct = (req, res, next) => {
  const id=req.params.prodId;
   Product.deleteproductbyID(id);
   res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
  res.render('/admin/products',{
    path:'/admin/products'
  })
  }
