const { DataTypes, Model } = require("sequelize");
const { db } = require("../../config/db");

class Direction extends Model {}

Direction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lng: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize: db,
    modelName: "direction",
    timestamps:false
  }
);

module.exports = Direction;
