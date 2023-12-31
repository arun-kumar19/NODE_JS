const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const sequelize=require('./util/database');
const Product=require('./models/product');
const User=require('./models/users');
const Cart=require('./models/cart');
const CartItem=require('./models/cartitem');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => console.log(err));
  });

app.use('/admin',adminRoutes)
app.use(shopRoutes);
app.use(errorController.get404);
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
Cart.belongsTo(User);
User.hasOne(Cart);
Product.belongsToMany(Cart,{through:CartItem});
Cart.belongsToMany(Product,{through:CartItem});

sequelize
  .sync()
  .then(result => {
    return User.findByPk(1);
    // console.log(result);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {

    if(!user.getCart()){
    return user.createCart();
    }

  }).then(()=>{
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
