const { DataTypes, Model } = require("sequelize");
const { db } = require("../../config/db");

class PlaceLocality extends Model {}

PlaceLocality.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    limit_tickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numeration: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    sold_tickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: "place_locality",
    timestamps: false,
  }
);

module.exports = PlaceLocality;
