const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const app = express();

const homeController=require('../controllers/home');

app.use(bodyParser.urlencoded({ extended: false }));

router.get('/', homeController.getUsers);

router.get('/loadContent', homeController.loadContent);
router.post('/add-expense', homeController.getAddUser);

router.get('/delete-expense/:expid', homeController.getDeleteExpense);

router.put('/update-expense/:expid', homeController.postUpdateExpense);
router.delete('/delete-expense/:expid', homeController.postDeleteExpense);

router.get('/edit-expense/:expid', homeController.getEditExpense);

module.exports=router;