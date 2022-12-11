const { DataTypes, Model } = require("sequelize");
const { db } = require("../../config/db");

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
      allowNull: false,
      unique:true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status:{
      type: DataTypes.BOOLEAN,
      defaultValue:true
    },
    google:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    email_verif:{
      type: DataTypes.BOOLEAN,
      defaultValue:false
    },
    num_document: {
      type: DataTypes.INTEGER,
      unique:true
    },
    img: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    phone: {
      type: DataTypes.INTEGER,
    }
  },
  {
    sequelize: db,
    modelName: "user",
    createdAt:'created_at',
    updatedAt:'updated_at'
  }
);

module.exports = User;
