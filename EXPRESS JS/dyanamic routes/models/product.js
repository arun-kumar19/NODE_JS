const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  
  constructor(title, imageUrl, description, price) {
  
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {

    this.id=Math.floor((Math.random() * 100) + 1).toString();
    getProductsFromFile(products => {
      console.log('val=',this);
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id,cb){
  
    getProductsFromFile(Products=>{
      const product=Products.find((item)=>item.id==id);
      cb(product);
    })
  }

  static updateProduct(editProductId,product) {
    console.log(product);
    getProductsFromFile(products => {
      const newarray=products.filter((element)=>element.id !==editProductId)
      newarray.push(product);
      fs.writeFile(p, JSON.stringify(newarray), (err) => {
        
        if(err){
          console.log('error during updating data in file');
        }
        else{
          console.log('record updated successfully');
        }

      })
    })
  }

static deleteproductbyID(id) {
  getProductsFromFile(products => {
    const newarray=products.filter((element)=>element.id !==id)
    fs.writeFile(p, JSON.stringify(newarray), (err) => {
      if(err){
        console.log('error during delete product from file');
      }
      else{
        console.log('record deleted successfully');
      }

    })
  })
  
}

};
