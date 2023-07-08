const express=require('express')
const route=express.Router();
const shopController=require('../controllers/products');

route.get('/',shopController.getShop);

module.exports=route;