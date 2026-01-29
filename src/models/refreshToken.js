const { DataTypes } =require("sequelize");

const sequelize = require("../config/database");

const User =require("./user");

const RefreshToken=sequelize.define(
    "RefreshToken",{
        id:{
            type:DataTypes.UUID,
            defaultValue:DataTypes.UUIDV4,
            primaryKey:true,
        },
      token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    revoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "refresh_tokens",
    timestamps: true,
  }
);

RefreshToken.belongsTo(User, { foreignKey: "user_id" });
User.hasMany(RefreshToken, { foreignKey: "user_id" });

 module.exports= RefreshToken;

