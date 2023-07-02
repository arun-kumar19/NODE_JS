const express=require('express')
const route=express.Router();
const path=require("path");

route.get((req,res,next)=>{

    res.status(404).sendFile(path.join(__dirname,'views','pagenotfound.html'));
    //res.send("hello");

});


module.exports=route;