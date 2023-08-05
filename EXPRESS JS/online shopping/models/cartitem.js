const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const CartItem=sequelize.define('cartitem',{
id:{
    type:Sequelize.INTEGER,
    allowNull:false,
    autoIncrement:true,
    primaryKey:true
},
quantity:{
    type:Sequelize.INTEGER,
    allowNull:false
}
})

module.exports=CartItem;