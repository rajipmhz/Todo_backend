const Todo = require("../models/todo");

const createTodo = async (data, userId) => {
  return await Todo.create({
    ...data,
    user_id: userId,
  });
};

const getTodosByUser = async (userId) => {
  return await Todo.findAll({ where: { user_id: userId } });
};

const updateTodo = async (todoId, userId, updateData) => {
  const todo = await Todo.findOne({
    where: { id: todoId, user_id: userId },
  });
  if (!todo) {
    throw new Error("Todo not found");
  }
  await todo.update(updateData);
  return todo;
};
const deleteTodo = async (todoId, userId) => {
  const todo = await Todo.findOne({
    where: { id: todoId, user_id: userId },
  });

  if (!todo) {
    throw new Error("Todo not found");
  }

  await todo.destroy();
};

module.exports = {
  createTodo,
  getTodosByUser,
  updateTodo,
  deleteTodo,
};
