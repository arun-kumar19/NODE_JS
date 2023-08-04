const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const User=sequelize.define('users',{
id:
{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allownull:false,
    primaryKey:true
},
name:
{
    type:Sequelize.STRING,
    allownull:false

},
email:
{
    type:Sequelize.STRING,
    allownull:false
}
    
});

module.exports=User;