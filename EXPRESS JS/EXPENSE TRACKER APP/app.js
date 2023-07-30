const express=require('express');
const bodyParser = require('body-parser');
const sequelize=require('./util/database');
const app=express();
app.set('view engine', 'ejs');
app.set('views', 'views');

var cors = require('cors')
 
app.use(cors())

app.use(bodyParser.json());

const homeRoute = require('./routes/home');


app.use(homeRoute);

sequelize.sync().then(()=>{
    console.log('Server Running........');
    app.listen(3000);
}).catch(error=>{
    console.log('error while synchnorising with database=',error);
})







