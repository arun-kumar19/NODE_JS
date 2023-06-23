const express=require('express');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.urlencoded({extended:false}));

app.use('/add-product',(req,res,next)=>{

    const htmlData=`<html><body><form action="product" method="POST"><input type="text" name="title"><br>
    <input type="text" name="size"><br>
    <button>Add Product</button></form><body><html>`
    res.send(htmlData);
})

app.post('/product',(req,res,next)=>{
    console.log(req.body);
    const obj=req.body;
    console.log("title="+obj.title);
    console.log("size="+obj.size);
    res.redirect('/');
})

app.use('/',(req,res,next)=>{

    res.send('<html><body><h1>Hello from Express JS!</h1></form>');

})

app.listen(3000);