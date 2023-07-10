const { Sequelize, QueryTypes } = require("sequelize");
const bcrypt = require("bcrypt");
require("dotenv").config();
const listaCatalogos = require("../data/listaCatalogos");
const { directions } = require("../data/place");

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

/**
 *
 * GENERATE QUERYS
 *
 */

const generateQueryCatalog = (nameTable, contentTable) => {
  let query = `INSERT INTO ${nameTable} (id, name) VALUES `;
  contentTable.forEach((catalog, index) => {
    query += `(${catalog.id},'${catalog.name}')`;
    if (index !== contentTable.length - 1) {
      query += ",";
    }
  });
  return query;
};

const generateQueryCatalogCities = (nameTable, contentTable) => {
  let query = `INSERT INTO ${nameTable} (id, name, province_id) VALUES `;
  contentTable.forEach((catalog, index) => {
    query += `(${catalog.id},'${catalog.name}', ${catalog.province_id})`;
    if (index !== contentTable.length - 1) {
      query += ",";
    }
  });
  return query;
};

const generateQueryDirection = (nameTable, contentTable) => {
  let query = `INSERT INTO ${nameTable} (id, description, reference, lat, lng, place_id, province_id, city_id) VALUES `;
  contentTable.forEach((direction, index) => {
    query += `(${direction.id},'${direction.description}','${direction.reference}','${direction.lat}','${direction.lng}',${direction.place_id},'${direction.province_id}','${direction.city_id}')`;
    if (index !== contentTable.length - 1) {
      query += ",";
    }
  });
  return query;
};

/**
 *
 * FIN GENERATE QUERYS
 *
 */

/**
 *
 *  INSERTS QUERYS
 *
 */

const insertCatalog = async (catalog) => {
  let query = "";
  if (catalog.name === "cities") {
    query = generateQueryCatalogCities(catalog.name, catalog.data);
  } else {
    query = generateQueryCatalog(catalog.name, catalog.data);
  }
  await db.query(query, {
    type: QueryTypes.INSERT,
  });
  console.log(`Datos insertados en la tabla "${catalog.name}"`);
};

const insertDirections = async (directions) => {
  const query = generateQueryDirection("directions", directions);

  await db.query(query, {
    type: QueryTypes.INSERT,
  });
  console.log(`Datos insertados en la tabla "directions"`);
};

/**
 *
 *  FIN INSERTS QUERYS
 *
 */

/**
 *
 *  VALIDATE QUERYS
 *
 */

const validCatalog = async (nameTable) => {
  let query = `select * from ${nameTable}`;

  if (nameTable === "places") {
    query += ` where user_id is null`;
  }

  const data = await db.query(query, {
    type: QueryTypes.SELECT,
  });

  if (data.length === 0) return true;

  return false;
};

const validTableDirections = async () => {
  const query = `
      SELECT *
      FROM directions AS d
      INNER JOIN places AS p ON d.place_id = p.id
      WHERE p.user_id IS NULL
    `;

  const data = await db.query(query, {
    type: QueryTypes.SELECT,
  });

  if (data.length === 0) return true;

  return false;
};

/**
 *
 * FIN VALIDATE QUERYS
 *
 */

const syncTables = async () => {
  try {
    // await db.sync({ alter: true, match: /test$/ });
    await db.sync({ alter: true });
    // await db.sync({ force: true });

    // Insercion de catalogos
    for await (const catalog of listaCatalogos) {
      const instertCatalog = await validCatalog(catalog.name);
      if (instertCatalog) await insertCatalog(catalog);
    }

    // Insercion de direcciones
    const instertDirections = await validTableDirections();
    if (instertDirections) await insertDirections(directions);

    // Para la insercion del usuario admin por defecto
    const usuario = await db.query("select * from users", {
      type: QueryTypes.SELECT,
    });
    if (usuario.length === 0) {
      const hash = await bcrypt.hash("admin", 10);
      await db.query(
        "INSERT INTO users ( name, surname, username, email, password, email_verif, created_at, updated_at, role_id) VALUES ('ALEX', 'ARCENTALES', 'aarcentales', 'aarcentales@eventosec.com', :password, true, :date, :date, 1)",
        {
          replacements: { password: hash, date: new Date() },
          type: QueryTypes.INSERT,
        }
      );
      console.log(`Usuario Admin Insertado`);
    }

    console.log(`**** Tablas sincronizadas ****`);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  db,
  connect,
  syncTables,
};
