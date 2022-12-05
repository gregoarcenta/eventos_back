const { DataTypes, Model } = require("sequelize");
const { db } = require("../../config/db");

class Role extends Model {}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "role",
    timestamps: false
  }
);

module.exports = Role;
