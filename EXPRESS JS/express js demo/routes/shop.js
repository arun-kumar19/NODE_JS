const express=require('express');
const routes=express.Router();


routes.get('/',(req,res,next)=>{

    res.send('<html><body><h1>Hello from Express JS!</h1></form>');

})

module.exports=routes;