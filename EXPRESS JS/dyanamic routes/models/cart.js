const fs=require("fs");
const Product = require('./product');
const path=require("path");
const { exit } = require("process");
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );
module.exports=class Cart{

    static addProduct(id,productPrice){

            fs.readFile(p,(err,fileContent)=>{

                let cart={products:[],totalPrice:0};
                if(!err && fileContent.length>0){
                        cart=JSON.parse(fileContent);
                }

                const existingProductIndex=cart.products.findIndex((item)=>item.id===id);
                const existingProduct=cart.products[existingProductIndex];
                    let updateProduct;
                if(existingProduct){
                    console.log("existing product=",existingProduct);
                        updateProduct={...existingProduct};
                        console.log("updateProduct=",updateProduct);
                        updateProduct.qty=updateProduct.qty+1;
                        console.log("updateProduct.qty=",updateProduct.qty);
                        cart.products[existingProductIndex]=updateProduct;
                }

                else{
                    updateProduct={id:id,qty:1};
                    cart.products=[...cart.products,updateProduct]
                }

                cart.totalPrice=cart.totalPrice + +productPrice;
                fs.writeFile(p,JSON.stringify(cart),(err)=>{
                    if(err){
                        console.log(err);
                }
                else {
                    console.log("Cart has been updated.");
                  }
            })
            });
            }

           /* const product=products.find((item)=>item.id===id)
            fs.writeFile(p,product.id+' '+product.price,(err=>{
                console.log(err);
            }))
            */
};
