const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', async (req,res)=>{    
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editMode:false,
      });
    
});

  exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      editMode:false,
    });
  };
  
router.get('/edit-product/:prodId', adminController.getEditProduct);

// /admin/products => GET
router.get('/products', async (req,res)=>{
    try{
    const result=await adminController.getProducts();
    res.render('admin/products', {
        prods: result,
        pageTitle: 'Shop',
        path: '/admin/products'
      });
    }catch(error){
        console.log('error fetching data=',error);
    }
});

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete/:prodId', adminController.deleteProduct);
router.get('/delete/:prodId', adminController.postDeleteProduct);

module.exports = router;
