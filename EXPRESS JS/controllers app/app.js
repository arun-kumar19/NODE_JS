const express=require("express");
const addproductRoute=require('./route/add-product')
const shopRoute=require('./route/shop')
const successRoute=require('./route/success')
const contactUsRoute=require('./route/contactus')
const PageErrorController=require('./controllers/error404');
const shopController=require('./controllers/products');
//const pagenotfoundRoute=require('./route/pagenotfound')
const app=express();
const path=require("path");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');
app.use(shopRoute);
app.use('/admin',addproductRoute);
app.use(contactUsRoute);
app.use(successRoute);
app.use(PageErrorController.get404);


app.listen(3000);