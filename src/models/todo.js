const {DataTypes}=require('sequelize')

const sequelize=require('../config/database')

const Todo=sequelize.define(
    'Todo',{
        id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    date: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    day:{
        type:DataTypes.STRING(20),
        allowNull:false
    },
    start_time:{
        type:DataTypes.STRING(10),
        allowNull:false
    },
    end_time:{
        type:DataTypes.STRING(10),
        allowNull:false
    },
    category:{
        type:DataTypes.STRING(100),
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM('pending','completed'),
        defaultValue:"pending"
    },
    user_id:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:"users",
            key:"id",
        },
        onDelete:"CASCADE",
    },
    },{
        tableName:'todos',
        timestamps:true,
    }
)

module.exports=Todo;