const Sequelize=require('sequelize');

//it creates a connection pool
const sequelize=require('../util/database');

const Product=sequelize.define('product',{
id:{
  type:Sequelize.INTEGER,
  autoIncrement:true,
  allowNull:false,
  primaryKey:true
},
title:Sequelize.STRING,
price:{
  type:Sequelize.DOUBLE,
  allowNull:false
},
imageurl:{
  type:Sequelize.STRING,
  allowNull:false
},
description:{
  type:Sequelize.STRING,
  allowNull:false
}
});

module.exports=Product;


