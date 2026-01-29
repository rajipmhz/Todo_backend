const { createSubtask, getSubtasksByTodo, updateSubtask, deleteSubtask } = require("../services/subtaskService")



const createSubtaskController=async(req,res)=>{
    try{
        const subtask=await createSubtask(
            req.params.todoId,
            req.user.id,
            req.body
        )
         res.status(201).json(subtask);
    }
    catch (err) {
    res.status(404).json({ message: err.message });
}
}

const getSubtasksController=async(req,res)=>{
    try{
        const subtasks=await getSubtasksByTodo(
            req.params.todoId,
            req.user.id
        )
    res.status(200).json(subtasks);
    }catch(err){
        res.status(404).json({message:err.message});
    }
}

const updateSubtaskController = async (req, res) => {
  try {
    const subtask = await updateSubtask(req.params.id, req.user.id, req.body);
    res.status(200).json(subtask);
  } catch (err) {
    console.error(err.message);
    res.status(404).json({ message: err.message });
  }
};

const deleteSubtaskController = async (req, res) => {
  try {
    await deleteSubtask(req.params.id, req.user.id);
    res.status(204).send(); 
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

module.exports={createSubtaskController,getSubtasksController,updateSubtaskController,deleteSubtaskController}