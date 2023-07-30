const Product=require('../models/product');
const {Op} = require('sequelize');

const users = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Alice' },
    { id: 3, name: 'Bob' },
  ];

exports.getUsers=async(req,res)=>{
    try{
       
    const products= await Product.findAll()

        if(!products){
            res.status(404).json({message:'something went wrong'});
        }
        //console.log('db values=',products.length);
        res.render('index', {
            prods: products,
            editMode:false,
            pageTitle: 'Shop',
            path: '/'
          })
          //res.json(products)
    }
catch(error){
        console.log(error);
    }
}  


exports.getAddUser = async (req, res) => {
        //const arr=[];
        const jsonData = req.body;
        console.log('jsonResponse=',req.body);
    try {
        const name = jsonData.username;
        const mobileno = jsonData.usermobileno;
        const emailid = jsonData.useremailid;
        console.log('values=[', name, mobileno, emailid, ']');
      const product = await Product.create({name, mobileno, emailid});
      
      if (!product) {
        return res.status(400).json({ message: 'Something went wrong' });
      }
      console.log('product saved successfully');
      //const products=await Product.findAll();
        console.log('new product=',product);
          //      arr.push(product.toJSON())
      //console.log('products=',arr);
    res.json(product); // Send the response inside the try block
    } catch (error) {
      console.log('error=',error.message);
res.status(500).json({ message: 'Internal server error' });
    }
  };


  
exports.loadContent = async (req, res) => {
    const arr=[];
    try {
  const products=await Product.findAll();
   // console.log(products);
    products.forEach(products=>{
            arr.push(products.toJSON());
    }) 
  //console.log('products=',arr);
res.json(arr); // Send the response inside the try block
} catch (error) {
  //console.log('error=',error.message);
res.status(500).json({ message: 'Internal server error' });
}
};
  

exports.getDeleteProduct=async (req,res)=>{
    console.log('param=',req.params.prodid);
    const id=req.params.prodid;
    try{
        const product=await Product.findByPk(id);
        if(product){
           await product.destroy();
           console.log('product deleted successfully');
        }
    }catch(error){
        console.log('something went wrong=',error);
    }
    res.redirect('/')

}

exports.getEditProduct=async (req,res)=>{
    console.log('param=',req.params.prodid);
    //console.log('editMode=',req.query.editMode);
    const productid=req.params.prodid;
    let product;
    try{
        product=await Product.findByPk(productid);
        /*const products=await Product.findAll({
            where: {
                id: {
                [Op.ne]: productid
              },
            },
          });
          */
        //console.log('fetched data=',product);

        if(!product){
            console.log('error fetching data from db');
        }
    /* res.render('index',{
        editMode:req.query.editMode,
        product: product,
        prods:products,
        pageTitle:'index',
        path:'/'
     });*/
     
    }catch(error){
        console.log('something went wrong=',error);
    }
    res.json(product);
}

exports.postEditProduct=async (req,res)=>{
    const id=req.params.prodid
    const{name,mobileno,emailid}=req.body;
    console.log('values=[',name,mobileno,emailid,']');
    try{
        const product=await Product.findByPk(id)
        if(!product){
            res.status(400).json({message:'something went wrong'});
        }
        cproduct.update({name,mobileno,emailid});
        console.log('product updated successfully');
    }catch(error){
        console.log(error);
    }
    res.redirect('/')

}

exports.postUpdateProduct=async (req,res)=>{

        const id=req.params.prodid;
        console.log('Post Edit JSON Data=',req.body);
        let updatedProduct;
    const{name,mobileno,emailid}=req.body;
    console.log('Updated values=[',id,name,mobileno,emailid,']');
    try{
        const product=await Product.findByPk(id)
        if(!product){
            res.status(400).json({message:'something went wrong'});
        }
        updatedProduct=await product.update({name,mobileno,emailid});
        console.log('post update resonse=',updatedProduct);
       // updatedProduct=await Product.findByPk(id);
        console.log('product updated successfully');
    }catch(error){
        console.log(error);
    }
    res.json(updatedProduct);

}


exports.postDeleteProduct=async (req,res)=>{

    const prodid=req.params.prodid;
console.log('Delete ID values=[',prodid,']');
try{
    const product=await Product.destroy({
        where:{
            id:prodid,
        }
        })
    if(!product){
        res.status(400).json({message:'something went wrong'});
    }
    res.json({messsage:'success'});
   // updatedProduct=await Product.findByPk(id);
    console.log('product deleted successfully');
}catch(error){
    console.log(error);
}

}
