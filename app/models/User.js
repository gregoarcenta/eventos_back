const { DataTypes, Model, Deferrable } = require("sequelize");
const { db } = require("../../config/db");
const Role = require("./Role");

class User extends Model {
  getFullname() {
    return [this.name, this.surname].join(" ");
  }
}

User.init(
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
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
    },
    img: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    phone: {
      type: DataTypes.INTEGER,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    document: {
      type: DataTypes.INTEGER,
    },
    document_id: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "user",
    createdAt:'created_at',
    updatedAt:'updated_at'
  }
);

module.exports = User;
