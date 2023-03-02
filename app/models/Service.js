const { DataTypes, Model } = require("sequelize");
const { db } = require("../../config/db");

class Service extends Model {}

Service.init(
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
    modelName: "service",
    timestamps: false
  }
);

module.exports = Service;
