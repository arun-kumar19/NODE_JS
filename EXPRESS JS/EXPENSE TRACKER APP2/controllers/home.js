const Expense=require('../models/expense');
const {Op} = require('sequelize');

exports.getUsers=async(req,res)=>{

        res.render('index', {
            path: '/'
          })

    }


exports.getAddUser = async (req, res) => {
        //const arr=[];
        const jsonData = req.body;
        console.log('jsonResponse=',req.body);
    try {
        const amount = jsonData.amount;
        const description = jsonData.description;
        const Category = jsonData.Category;
        console.log('values=[', amount, description, Category, ']');
      const expense = await Expense.create({amount, description, Category});
      
      if (!expense) {
        return res.status(400).json({ message: 'Something went wrong' });
      }
      console.log('expense saved successfully');
      //const expenses=await Expense.findAll();
        console.log('new expense=',expense);
          //      arr.push(expense.toJSON())
      //console.log('expenses=',arr);
    res.json(expense); // Send the response inside the try block
    } catch (error) {
      console.log('error=',error.message);
res.status(500).json({ message: 'Internal server error' });
    }
  };


exports.loadContent = async (req, res) => {
    const arr=[];
    try {
  const expenses=await Expense.findAll();
   // console.log(expenses);
    expenses.forEach(expenses=>{
            arr.push(expenses.toJSON());
    }) 
  //console.log('expenses=',arr);
res.json(arr); // Send the response inside the try block
} catch (error) {
  //console.log('error=',error.message);
res.status(500).json({ message: 'Internal server error' });
}
};
  

exports.getDeleteExpense=async (req,res)=>{
    console.log('param=',req.params.expid);
    const id=req.params.expid;
    try{
        const expense=await Expense.findByPk(id);
        if(expense){
           await expense.destroy();
           console.log('expense deleted successfully');
        }
    }catch(error){
        console.log('something went wrong=',error);
    }
    res.redirect('/')

}

exports.getEditExpense=async (req,res)=>{
    console.log('param=',req.params.expid);
    //console.log('editMode=',req.query.editMode);
    const expenseid=req.params.expid;
    let expense;
    try{
        expense=await Expense.findByPk(expenseid);
        /*const expenses=await Expense.findAll({
            where: {
                id: {
                [Op.ne]: expenseid
              },
            },
          });
          */
        //console.log('fetched data=',expense);

        if(!expense){
            console.log('error fetching data from db');
        }
    /* res.render('index',{
        editMode:req.query.editMode,
        expense: expense,
        prods:expenses,
        pageTitle:'index',
        path:'/'
     });*/
     
    }catch(error){
        console.log('something went wrong=',error);
    }
    res.json(expense);
}

exports.postEditExpense=async (req,res)=>{
    const id=req.params.expid
    const{amount,description,Category}=req.body;
    console.log('values=[',amount,description,Category,']');
    try{
        const expense=await Expense.findByPk(id)
        if(!expense){
            res.status(400).json({message:'something went wrong'});
        }
        cexpense.update({amount,description,Category});
        console.log('expense updated successfully');
    }catch(error){
        console.log(error);
    }
    res.redirect('/')

}

exports.postUpdateExpense=async (req,res)=>{

        const id=req.params.expid;
        console.log('Post Edit JSON Data=',req.body);
        let updatedExpense;
    const{amount,description,Category}=req.body;
    console.log('Updated values=[',id,amount,description,Category,']');
    try{
        const expense=await Expense.findByPk(id)
        if(!expense){
            res.status(400).json({message:'something went wrong'});
        }
        updatedExpense=await expense.update({amount,description,Category});
        console.log('post update resonse=',updatedExpense);
       // updatedExpense=await Expense.findByPk(id);
        console.log('expense updated successfully');
    }catch(error){
        console.log(error);
    }
    res.json(updatedExpense);

}


exports.postDeleteExpense=async (req,res)=>{

    const expid=req.params.expid;
console.log('Delete ID values=[',expid,']');
try{
    const expense=await Expense.destroy({
        where:{
            id:expid,
        }
        })
    if(!expense){
        res.status(400).json({message:'something went wrong'});
    }
    res.json({messsage:'success'});
   // updatedExpense=await Expense.findByPk(id);
    console.log('expense deleted successfully');
}catch(error){
    console.log(error);
}

}
