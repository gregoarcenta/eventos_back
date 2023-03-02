const { DataTypes, Model } = require("sequelize");
const { db } = require("../../config/db");

class City extends Model {}

City.init(
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
    modelName: "city",
    timestamps: false
  }
);

module.exports = City;
