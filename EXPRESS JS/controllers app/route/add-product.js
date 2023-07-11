const path=require("path");
const express=require('express')
const route=express.Router();
const rootPath=require("../util/path");
const productController=require('../controllers/products');

route.get('/add-product',productController.addProductPage);

route.post('/add-product', productController.postAddProduct);

module.exports=route;

/*
route.use('/add-product',(req,res,next)=>{

res.sendFile(path.join(rootPath,'views','add-product.html'));

});
*/