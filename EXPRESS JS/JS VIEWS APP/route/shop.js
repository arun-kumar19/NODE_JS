const express=require('express')
const route=express.Router();
const path=require("path");
const rootPath=require("../util/path");

route.get('/',(req,res,next)=>{

    res.sendFile(path.join(rootPath,'views','shop.html'));

});

module.exports=route;