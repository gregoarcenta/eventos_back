const { config } = require("dotenv");
const { Sequelize } = require("sequelize");
require("dotenv").config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const db = new Sequelize(`postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

const connect = async () => {
  try {
    await db.authenticate();
    console.log("Se ha conectado correctamente a la base de datos");
  } catch (error) {
    console.error("Error al conectarse a la base de datos", error);
  }
};

module.exports = {
  db,
  connect
}
