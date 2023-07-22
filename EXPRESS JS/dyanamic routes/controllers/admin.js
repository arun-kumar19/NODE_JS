
const { json } = require('body-parser');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editMode:false,
  });
};


exports.getEditProduct = async (req, res, next) => {
const editMode=req.query.edit;
const id=req.params.prodId;
try{
const product=await Product.findByPk(id);
if(editMode){
console.log(product);
  res.render('admin/edit-product', {
    pageTitle: 'edit Product',
    path: '/admin/edit-product',
    editMode:editMode,
    product:product,
  });
}
}catch(error){
  console.log(error);
}
}

exports.postAddProduct = async (req, res, next) => {
  try{
  const title = req.body.title;
  const imageurl = req.body.imageurl;
  const price = req.body.price;
  const description = req.body.description;
  console.log(title,' ',imageurl,' ',price,' ',description);
  const result=await Product.create({title,price,imageurl,description});
    console.log("data saved successfully=",result);
  }catch(error){
    console.error('error product not saved in db=',error);
  };
  res.redirect('/');
};

exports.getProducts =async function getProducts() {
try{
  const products=Product.findAll();
  return products;
}catch(error){
    console.log(err);
  }
}


exports.postEditProduct = async (req, res, next) => {
  
  try{
    const productid=req.body.productId;
    const {title, price,imageurl,description}=req.body;
    //console.log(title, '',productid);
  const product=await Product.findByPk(productid);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  await product.update({title,price,imageurl,description})
  console.log('product updated succcessfully');

}catch(error){
    console.log(error);
  }
  res.redirect('/admin/products');

};


exports.deleteProduct = async (req, res, next) => {
  const id=req.params.prodId;
  try{
      const product=await Product.findByPk(id);

      if(!product){
        res.status(404).json({message:'something went wrong. Please contact support team'});
      }
      
      await product.destroy();
    console.log("product deleted successfully")
   }catch(err){
    console.log(err);
   };
   res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
  res.render('/admin/products',{
    path:'/admin/products'
  })
  }
