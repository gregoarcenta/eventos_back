const { DataTypes, Model } = require("sequelize");
const { db } = require("../../config/db");

class Document extends Model {}

Document.init(
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
    modelName: "document",
    timestamps: false
  }
);

module.exports = Document;
