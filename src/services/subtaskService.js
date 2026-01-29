const Subtask=require("../models/subtask");
const Todo=require("../models/todo");


const createSubtask = async (todoId, userId, data) => {
  const todo = await Todo.findOne({
    where: { id: todoId, user_id: userId },
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  return await Subtask.create({
    ...data,
    todo_id: todoId,
  });
};

const getSubtasksByTodo = async (todoId, userId) => {
  const todo = await Todo.findOne({
    where: { id: todoId, user_id: userId },
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  return await Subtask.findAll({
    where: { todo_id: todoId },
  });
};

const updateSubtask = async (subtaskId, userId, updateData) => {
  const subtask = await Subtask.findByPk(subtaskId, {
    include: { model: Todo, as: "todo" },
  });

  if (!subtask) throw new Error("Subtask not found");
  if (!subtask.todo) throw new Error("Parent todo not found");
  if (subtask.todo.user_id !== userId) throw new Error("Unauthorized");

  await subtask.update(updateData);
  return subtask;
};

const deleteSubtask = async (subtaskId, userId) => {
  const subtask = await Subtask.findByPk(subtaskId, {
    include: { model: Todo, as: "todo" },
  });

  if (!subtask) throw new Error("Subtask not found");

  if (!subtask.todo) throw new Error("Parent todo not found");

  if (subtask.todo.user_id !== userId)
    throw new Error("Unauthorized");

  await subtask.destroy();
};

module.exports = {
  createSubtask,
  getSubtasksByTodo,
  updateSubtask,
  deleteSubtask,
};