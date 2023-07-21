const db=require('../util/database');

module.exports = class Product {
  
  constructor(title, imageUrl, description, price) {
  
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute('INSERT INTO PRODUCTS(title,imageurl,price,description) VALUES(?,?,?,?)',[this.title,this.imageUrl,this.price,this.description]);
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id){
    return db.execute('SELECT * FROM PRODUCTS WHERE PRODUCTS.ID=?',[id]);
 
  }

  static updateProduct(editProductId,product) {

    //console.log('edited product id=',editProductId,' edited data=',product);

    return db.execute('UPDATE PRODUCTS SET title=?,imageurl=?,price=?,description=? WHERE id=?',[product.title,product.imageUrl,product.price,product.description,editProductId])

  
  }

static deleteproductbyID(id) {

  return db.execute('DELETE FROM PRODUCTS WHERE id=?',[id]);
  
}

};
