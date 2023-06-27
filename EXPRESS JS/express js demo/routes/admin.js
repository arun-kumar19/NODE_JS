const express=require('express');

const router=express.Router();


router.get('/add-product',(req,res,next)=>{

    const htmlData=`<html><body><form action="/admin/product" method="POST"><input type="text" name="title"><br>
    <input type="text" name="size"><br>
    <button>Add Product</button></form><body><html>`
    res.send(htmlData);
})

router.post('/product',(req,res,next)=>{
    console.log(req.body);
    const obj=req.body;
    console.log("title="+obj.title);
    console.log("size="+obj.size);
    res.redirect('/');
})

module.exports=router;