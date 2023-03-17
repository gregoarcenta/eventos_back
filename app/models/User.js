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
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    google: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    email_verif: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    num_document: {
      type: DataTypes.STRING,
      unique: true,
    },
    business_name: {
      type: DataTypes.STRING,
      unique: true,
    },
    img: {
      type: DataTypes.TEXT,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    phone: {
      type: DataTypes.STRING,
    },
    jwt_reset_token: {
      type: DataTypes.STRING,
      unique: true,
    },
    jwt_reset_token_valid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    modelName: "user",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = User;
