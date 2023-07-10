const { DataTypes, Model } = require("sequelize");
const { db } = require("../../config/db");

class Locality extends Model {}

Locality.init(
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
    modelName: "locality",
    timestamps: false
  }
);

module.exports = Locality;
