const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

const homeController=require('../controllers/home');

app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', homeController.getUsers);

router.get('/loadContent', homeController.loadContent);
router.post('/add-product', homeController.getAddUser);

router.get('/delete-product/:prodid', homeController.getDeleteProduct);

router.put('/update-product/:prodid', homeController.postUpdateProduct);
router.delete('/delete-product/:prodid', homeController.postDeleteProduct);

router.get('/edit-product/:prodid', homeController.getEditProduct);

module.exports=router;