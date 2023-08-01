const Sequelize=require('sequelize');

//it creates a connection pool
const sequelize=require('../util/database');

const expense=sequelize.define('expense',{
id:{
  type:Sequelize.INTEGER,
  autoIncrement:true,
  allowNull:false,
  primaryKey:true
},
amount:{
  type:Sequelize.INTEGER,
  allowNull:false
},
description:{
  type:Sequelize.STRING,
  allowNull:false
},
Category:{
  type:Sequelize.STRING,
  allowNull:false
}
});

module.exports=expense;


