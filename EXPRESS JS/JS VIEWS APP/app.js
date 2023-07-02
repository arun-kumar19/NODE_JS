const express=require("express");
const addproductRoute=require('./route/add-product')
const shopRoute=require('./route/shop')
const successRoute=require('./route/success')
const contactUsRoute=require('./route/contactus')
//const pagenotfoundRoute=require('./route/pagenotfound')
const app=express();
const path=require("path");
app.use(express.static(path.join(__dirname,'public')));
app.use(shopRoute);
app.use(addproductRoute);
app.use(contactUsRoute);
app.use(successRoute);

app.use((req,res,next)=>{

    res.status(404).sendFile(path.join(__dirname,'views','pagenotfound.html'));
    //res.send("hello");

});


app.listen(3000);