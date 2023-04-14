const { DataTypes, Model } = require("sequelize");
const { db } = require("../../config/db");

class Place extends Model {}

Place.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: db,
    modelName: "place",
    timestamps:false
  }
);

module.exports = Place;
