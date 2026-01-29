const { createTodo, getTodosByUser, updateTodo, deleteTodo } = require("../services/todoService")

const createTodoController=async(req,res)=>{
    try{
        const todo=await createTodo(req.body,req.user.id);
        res.status(201).json(todo);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const getTodoController=async(req,res)=>{
    try{
        const todos=await getTodosByUser(req.user.id);
        res.status(200).json(todos);
    }catch(err){
        res.status(400).json({message:err.message});
    }
}

const updateTodoController=async(req,res)=>{
    try{
        const todo=await updateTodo(req.params.id,req.user.id,req.body);
        res.status(200).json(todo);
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

const deleteTodoController=async(req,res)=>{
    try{
     await deleteTodo(req.params.id,req.user.id);
        res.status(204).send();
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

module.exports={createTodoController,getTodoController,updateTodoController,deleteTodoController}