const { Sequelize, QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
require("dotenv").config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

const db = new Sequelize(
  `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false,
  }
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
    // await db.sync({ alter: true, match: /test$/ });
    await db.sync({ alter: true });
    console.log(`Tablas sincronizadas`);

    // Insercion catalogo de roles
    const roles = await db.query("select * from roles", {
      type: QueryTypes.SELECT,
    });
    if (roles.length === 0) {
      await db.query(
        "INSERT INTO roles (id, name) VALUES (1,'ADMIN'), (2,'USUARIO')",
        {
          type: QueryTypes.INSERT,
        }
      );
      console.log(`Roles Insertados`);
    }

    // Insercion catalogo de Documentos
    const documents = await db.query("select * from documents", {
      type: QueryTypes.SELECT,
    });
    if (documents.length === 0) {
      await db.query(
        "INSERT INTO documents (id, name) VALUES (1,'CEDULA'), (2,'RUC'), (3,'PASAPORTE')",
        {
          type: QueryTypes.INSERT,
        }
      );
      console.log(`Documentos Insertados`);
    }

    // Para la insercion del usuario admin por defecto
    const usuario = await db.query("select * from users", {
      type: QueryTypes.SELECT,
    });
    if (usuario.length === 0) {
      const hash = await bcrypt.hash("admin", 10);
      await db.query(
        "INSERT INTO users ( name, surname, username, email, password, email_verif, created_at, updated_at, role_id) VALUES ('ALEX', 'ARCENTALES', 'aarcentales', 'aarcentales@gmail.com', :password, true, :date, :date, 1)",
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
