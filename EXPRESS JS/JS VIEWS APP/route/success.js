const express=require('express')
const route=express.Router();
const path=require("path");
const rootPath=require("../util/path");

route.post('/success',(req,res,next)=>{

    res.sendFile(path.join(rootPath,'views','success.html'));

});

module.exports=route;