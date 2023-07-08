const express=require('express')
const route=express.Router();

const successController=require('../controllers/success');

route.post('/success',successController.getsuccess);

module.exports=route;