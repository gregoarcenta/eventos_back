const { Sequelize, QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
require("dotenv").config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const db = new Sequelize(
  `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);

const connect = async () => {
  try {
    await db.authenticate();
    console.log("Se ha conectado correctamente a la base de datos");
  } catch (error) {
    console.error("Error al conectarse a la base de datos", error);
  }
};

const syncTables = async () => {
  try {
    await db.sync({ alter: true, match: /test$/ });
    console.log(`Tablas sincronizadas`);

    // Para la insercion de roles
    const roles = await db.query("select * from roles", {
      type: QueryTypes.SELECT,
    });
    if (roles.length === 0) {
      await db.query("INSERT INTO roles (id, name) VALUES (1,'ADMIN')", {
        type: QueryTypes.INSERT,
      });
      await db.query("INSERT INTO roles (id, name) VALUES (2,'USUARIO')", {
        type: QueryTypes.INSERT,
      });
      console.log(`Roles Insertados`);
    }

    // Para la insercion del usuario admin por defecto
    const usuario = await db.query("select * from users", {
      type: QueryTypes.SELECT,
    });
    if (usuario.length === 0) {
      const hash = await bcrypt.hash("admin", 10);
      await db.query(
        "INSERT INTO users ( id, name, surname, username, img, age, phone, email, password, document, document_id, created_at, updated_at, role_id) VALUES (1, 'ALEX', 'ARCENTALES', 'aarcentales', NULL, 25, NULL, 'aarcentales@gmail.com', :password, NULL, NULL, :date, :date, 1)",
        {
          replacements: { password: hash, date: new Date() },
          type: QueryTypes.INSERT,
        }
      );
      console.log(`Usuario Admin Insertado`);
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  db,
  connect,
  syncTables,
};
