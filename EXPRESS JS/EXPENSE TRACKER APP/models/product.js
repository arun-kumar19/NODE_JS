const Sequelize=require('sequelize');

//it creates a connection pool
const sequelize=require('../util/database');

const Product=sequelize.define('User',{
id:{
  type:Sequelize.INTEGER,
  autoIncrement:true,
  allowNull:false,
  primaryKey:true
},
name:Sequelize.STRING,
mobileno:{
  type:Sequelize.STRING,
  allowNull:false
},
emailid:{
  type:Sequelize.STRING,
  allowNull:false
}
});

module.exports=Product;


