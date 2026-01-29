const sequelize = require("../config/database");

const User = require("./user");
const RefreshToken = require("./refreshToken");
const Todo = require("./todo");
const Subtask = require("./subtask");

User.hasMany(Todo, { foreignKey: "user_id", as: "todos" });
Todo.belongsTo(User, { foreignKey: "user_id", as: "user" });

Todo.hasMany(Subtask, {
  foreignKey: "todo_id",
  as: "subtasks",
  onDelete: "CASCADE",
});
Subtask.belongsTo(Todo, {
  foreignKey: "todo_id",
  as: "todo",
});


module.exports = {
  sequelize,
  User,
  RefreshToken,
  Todo,
  Subtask,
};
