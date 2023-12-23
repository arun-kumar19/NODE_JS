import {Router} from 'express';

import {Todo} from '../models/todo';

const router=Router();

const todos: Todo[]=[]

router.get('/',(req,res,next)=>{

    res.status(200).json({todos:todos})
});

router.post('/todo',(req,res,next)=>{
    console.log('request data=',req.body.text);
    console.log('request data=',req.body);
    const newTodo:Todo={
        id: new Date().toISOString(),
        text:req.body.text,
    }
    todos.push(newTodo);
    res.status(200).json({success:1});
})

router.post('/deletetodo',(req,res,next)=>{

    const user=req.body.text;
    console.log('itemid=',user);
    const result = deleteByIdInPlace(user);
    console.log('result=',result);
if (result) {
  res.status(200).json({'Found:':'item deleted'});
} else {

  res.status(404).json({status:'Item Not found'});
}

})

function deleteByIdInPlace(id: string): boolean {
    const index = todos.findIndex(obj => obj.text === id);
    if (index !== -1) {
      todos.splice(index, 1);
      return true;
    }
    
  else 
  return false;
}


router.post('/edittodo',(req,res,next)=>{

    const user=req.body.oldusername;
    const newuser=req.body.newusername;

    console.log('itemid=',user);
    const result = editByNameInPlace(user,newuser);
    console.log('result=',result);
if (result) {
  res.status(200).json({'Found:':'Name updated'});
} else {

  res.status(404).json({status:'Item Not found'});
}

})


function editByNameInPlace(id: string,newuser:string): boolean {
    const index = todos.findIndex(obj => obj.text === id);
    if (index !== -1) {
      const todo:Todo=todos[index];
      todo.text=newuser;
      return true;
    }
    
  else 
  return false;
}


export default router;