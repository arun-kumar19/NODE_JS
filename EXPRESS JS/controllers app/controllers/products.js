const path=require('path');
const rootPath=require('../util/path');
const Product=require('../models/product');

//for accessing ejs file render functions requires
exports.addProductPage=(req,res,next)=>{

    
    res.render('add-product');
};


exports.getProduct=(req,res,next)=>{

    Product.fetchAll((products=>{
        
        //console.log('products=',products);

        res.render('shop',{
            prods:products,
            pageTitle: 'Shop',
            path: '/',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
    })
    
    }));
};

exports.postAddProduct=(req,res,next)=>{

    console.log('req body data=',req.body);

    const product=new Product(req.body.title);
    
    product.save();

    res.redirect('/');
};

//if accessing html file then sendfile function requires to access it
/*exports.getAddProduct=(req,res,next)=>{
    res.sendFile(path.join(rootPath,'views','add-product.html'));
};*/