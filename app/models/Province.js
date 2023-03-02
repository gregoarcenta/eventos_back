const { DataTypes, Model } = require("sequelize");
const { db } = require("../../config/db");

class Province extends Model {}

Province.init(
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
    modelName: "province",
    timestamps: false
  }
);

module.exports = Province;
