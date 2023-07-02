const express=require('express')
const route=express.Router();
const path=require("path");
const rootPath=require("../util/path");

route.get('/add-product',(req,res,next)=>{

    res.sendFile(path.join(rootPath,'views','addproduct.html'));
    //res.send("hello");

});


module.exports=route;