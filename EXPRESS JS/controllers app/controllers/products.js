const path=require('path');
const rootPath=require('../util/path');

//for accessing ejs file render functions requires
exports.getAddProduct=(req,res,next)=>{
    res.render('add-product',{
        name:'arun',
        age:'30'
    });
};

exports.getShop=(req,res,next)=>{
    res.sendFile(path.join(rootPath,'views','shop.html'));
};


//if accessing html file then sendfile function requires to access it
/*exports.getAddProduct=(req,res,next)=>{
    res.sendFile(path.join(rootPath,'views','add-product.html'));
};*/