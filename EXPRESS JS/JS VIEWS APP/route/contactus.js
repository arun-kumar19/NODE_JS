const express=require('express')
const route=express.Router();
const path=require("path");
const rootPath=require("../util/path");

route.get('/contactus',(req,res,next)=>{

    res.sendFile(path.join(rootPath,'views','contactus.html'));

});

module.exports=route;