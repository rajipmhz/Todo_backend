const { DataTypes } = require("sequelize");

const sequelize = require("../config/database");

const Subtask = sequelize.define("Subtask", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
      title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    start_time: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    end_time: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed'),
      defaultValue: 'pending'
    },
    todo_id:{
        type:DataTypes.UUID,
        allowNull:false
    }
},
{
    tableName:'subtasks',
    timestamps:true,
}
);

module.exports=Subtask