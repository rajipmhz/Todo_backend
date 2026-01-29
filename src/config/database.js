require('dotenv').config();


const db_url=process.env.DB_URL;

const {Sequelize}=require('sequelize');

const sequelize=new Sequelize(
    db_url,{
        dialect:'postgres',
    }
);

module.exports=sequelize;