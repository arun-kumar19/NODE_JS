const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const shopController = require('../controllers/shop');

const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/product/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;
