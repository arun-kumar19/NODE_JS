
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
  Product.findById(id).then((result)=>{
console.log(result[0][0]);
  res.render('admin/edit-product', {
    pageTitle: 'edit Product',
    path: '/admin/edit-product',
    editMode:editMode,
    product:result[0][0],
  });
}).catch(err=>{
  console.log(err);
})
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save().then((result, filedata)=>{
    console.log("data saved successfully");
  }).catch(err=>{
    console.log('error product not saved in db')
  });
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows,filedata])=>{
    res.render('admin/products', {
      prods: rows,
      pageTitle: 'Shop',
      path: '/admin/products'
    });
  }
  ).catch(err=>{
    console.log(err);
  })
}


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
  Product.updateProduct(editProductId,editedProduct).then(result=>{
    console.log('updated successfully');
  }).catch(err=>{
    console.log(err);
  });
  res.redirect('/admin/products');

};


exports.deleteProduct = (req, res, next) => {
  const id=req.params.prodId;
   Product.deleteproductbyID(id).then(result=>{
    console.log("product deleted successfully");
   }).catch(err=>{
    console.log(err);
   });
   res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
  res.render('/admin/products',{
    path:'/admin/products'
  })
  }
