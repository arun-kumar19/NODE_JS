const express=require('express')
const route=express.Router();
const shopController=require('../controllers/products');


route.get('/',shopController.getProduct);

route.post('/',shopController.postAddProduct);


module.exports=route;