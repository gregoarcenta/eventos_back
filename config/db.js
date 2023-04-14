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
    // await db.sync({ force: true });

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

    // Insercion catalogo de Servicios
    const services = await db.query("select * from services", {
      type: QueryTypes.SELECT,
    });
    if (services.length === 0) {
      await db.query(
        "INSERT INTO services (id, name) VALUES (1,'CONCIERTO'), (2,'SEMINARIO'), (3,'TEATRO'), (4,'OTRO')",
        {
          type: QueryTypes.INSERT,
        }
      );
      console.log(`Servicios Insertados`);
    }

    // Insercion catalogo de Provinces
    const provinces = await db.query("select * from provinces", {
      type: QueryTypes.SELECT,
    });
    if (provinces.length === 0) {
      await db.query(
        "INSERT INTO provinces (id, name) VALUES (1, 'AZUAY'), (2, 'BOLIVAR'), (3, 'CAÑAR'),(4, 'CARCHI'), (5, 'COTOPAXI'), (6, 'CHIMBORAZO'), (7, 'EL ORO'), (8, 'ESMERALDAS'),(9, 'GUAYAS'), (10, 'IMBABURA'), (11, 'LOJA'), (12, 'LOS RIOS'), (13, 'MANABI'), (14, 'MORONA SANTIAGO'), (15, 'NAPO'), (16, 'PASTAZA'), (17, 'PICHINCHA'), (18, 'TUNGURAHUA'), (19, 'ZAMORA CHINCHIPE'), (20, 'GALAPAGOS'), (21, 'SUCUMBIOS'), (22, 'ORELLANA'), (23, 'SANTO DOMINGO DE LOS TSACHILAS'), (24, 'SANTA ELENA')",
        {
          type: QueryTypes.INSERT,
        }
      );
      console.log(`Provincias Insertadas`);
    }

    // Insercion catalogo de Cities
    const cities = await db.query("select * from cities", {
      type: QueryTypes.SELECT,
    });
    if (cities.length === 0) {
      await db.query(
        "INSERT INTO cities (id, name, province_id) VALUES (1, 'CUENCA', 1), (2, 'GIRÓN', 1), (3, 'GUALACEO', 1), (4, 'NABÓN', 1), (5, 'PAUTE', 1), (6, 'PUCARA', 1), (7, 'SAN FERNANDO', 1), (8, 'SANTA ISABEL', 1), (9, 'SIGSIG', 1), (10, 'OÑA', 1), (11, 'CHORDELEG', 1), (12, 'EL PAN', 1), (13, 'SEVILLA DE ORO', 1), (14, 'GUACHAPALA', 1),(15, 'CAMILO PONCE ENRÍQUEZ', 1), (16, 'GUARANDA', 2), (17, 'CHILLANES', 2), (18, 'CHIMBO', 2), (19, 'ECHEANDÍA', 2), (20, 'SAN MIGUEL', 2), (21, 'CALUMA', 2), (22, 'LAS NAVES', 2), (23, 'AZOGUES', 3), (24, 'BIBLIÁN', 3), (25, 'CAÑAR', 3), (26, 'LA TRONCAL', 3), (27, 'EL TAMBO', 3), (28, 'DÉLEG', 3), (29, 'SUSCAL', 3), (30, 'TULCÁN', 4), (31, 'BOLÍVAR', 4), (32, 'ESPEJO', 4), (33, 'MIRA', 4), (34, 'MONTÚFAR', 4), (35, 'SAN PEDRO DE HUACA', 4), (36, 'LATACUNGA', 5), (37, 'LA MANÁ', 5), (38, 'PANGUA', 5), (39, 'PUJILI', 5), (40, 'SALCEDO', 5), (41, 'SAQUISILÍ', 5), (42, 'SIGCHOS', 5), (43, 'RIOBAMBA', 6), (44, 'ALAUSI', 6), (45, 'COLTA', 6), (46, 'CHAMBO', 6), (47, 'CHUNCHI', 6), (48, 'GUAMOTE', 6), (49, 'GUANO', 6), (50, 'PALLATANGA', 6), (51, 'PENIPE', 6), (52, 'CUMANDÁ', 6), (53, 'MACHALA', 7), (54, 'ARENILLAS', 7), (55, 'ATAHUALPA', 7), (56, 'BALSAS', 7), (57, 'CHILLA', 7), (58, 'EL GUABO', 7), (59, 'HUAQUILLAS', 7), (60, 'MARCABELÍ', 7), (61, 'PASAJE', 7), (62, 'PIÑAS', 7), (63, 'PORTOVELO', 7), (64, 'SANTA ROSA', 7), (65, 'ZARUMA', 7), (66, 'LAS LAJAS', 7), (67, 'ESMERALDAS', 8), (68, 'ELOY ALFARO', 8), (69, 'MUISNE', 8), (70, 'QUININDÉ', 8), (71, 'SAN LORENZO', 8), (72, 'ATACAMES', 8), (73, 'RIOVERDE', 8), (74, 'LA CONCORDIA', 8), (75, 'GUAYAQUIL', 9), (76, 'ALFREDO BAQUERIZO MORENO (JUJÁN)', 9), (77, 'BALAO', 9), (78, 'BALZAR', 9), (79, 'COLIMES', 9), (80, 'DAULE', 9), (81, 'DURÁN', 9), (82, 'EL EMPALME', 9), (83, 'EL TRIUNFO', 9), (84, 'MILAGRO', 9), (85, 'NARANJAL', 9), (86, 'NARANJITO', 9), (87, 'PALESTINA', 9), (88, 'PEDRO CARBO', 9), (89, 'SAMBORONDÓN', 9), (90, 'SANTA LUCÍA', 9), (91, 'SALITRE (URBINA JADO)', 9), (92, 'SAN JACINTO DE YAGUACHI', 9), (93, 'PLAYAS', 9), (94, 'SIMÓN BOLÍVAR', 9), (95, 'CORONEL MARCELINO MARIDUEÑA', 9), (96, 'LOMAS DE SARGENTILLO', 9), (97, 'NOBOL', 9), (98, 'GENERAL ANTONIO ELIZALDE', 9), (99, 'ISIDRO AYORA', 9), (100, 'IBARRA', 10), (101, 'ANTONIO ANTE', 10), (102, 'COTACACHI', 10), (103, 'OTAVALO', 10), (104, 'PIMAMPIRO', 10), (105, 'SAN MIGUEL DE URCUQUÍ', 10), (106, 'LOJA', 11), (107, 'CALVAS', 11), (108, 'CATAMAYO', 11), (109, 'CELICA', 11), (110, 'CHAGUARPAMBA', 11), (111, 'ESPÍNDOLA', 11), (112, 'GONZANAMÁ', 11), (113, 'MACARÁ', 11), (114, 'PALTAS', 11), (115, 'PUYANGO', 11), (116, 'SARAGURO', 11), (117, 'SOZORANGA', 11), (118, 'ZAPOTILLO', 11), (119, 'PINDAL', 11), (120, 'QUILANGA', 11), (121, 'OLMEDO', 11), (122, 'BABAHOYO', 12), (123, 'BABA', 12), (124, 'MONTALVO', 12), (125, 'PUEBLOVIEJO', 12), (126, 'QUEVEDO', 12), (127, 'URDANETA', 12), (128, 'VENTANAS', 12), (129, 'VÍNCES', 12), (130, 'PALENQUE', 12), (131, 'BUENA FÉ', 12), (132, 'VALENCIA', 12), (133, 'MOCACHE', 12), (134, 'QUINSALOMA', 12), (135, 'PORTOVIEJO', 13), (136, 'BOLÍVAR', 13), (137, 'CHONE', 13), (138, 'EL CARMEN', 13), (139, 'FLAVIO ALFARO', 13), (140, 'JIPIJAPA', 13), (141, 'JUNÍN', 13), (142, 'MANTA', 13), (143, 'MONTECRISTI', 13), (144, 'PAJÁN', 13), (145, 'PICHINCHA', 13), (146, 'ROCAFUERTE', 13), (147, 'SANTA ANA', 13), (148, 'SUCRE', 13), (149, 'TOSAGUA', 13), (150, '24 DE MAYO', 13), (151, 'PEDERNALES', 13), (152, 'OLMEDO', 13), (153, 'PUERTO LÓPEZ', 13), (154, 'JAMA', 13), (155, 'JARAMIJÓ', 13), (156, 'SAN VICENTE', 13), (157, 'MORONA', 14), (158, 'GUALAQUIZA', 14), (159, 'LIMÓN INDANZA', 14), (160, 'PALORA', 14), (161, 'SANTIAGO', 14), (162, 'SUCÚA', 14), (163, 'HUAMBOYA', 14), (164, 'SAN JUAN BOSCO', 14), (165, 'TAISHA', 14), (166, 'LOGROÑO', 14), (167, 'PABLO SEXTO', 14), (168, 'TIWINTZA', 14), (169, 'TENA', 15), (170, 'ARCHIDONA', 15), (171, 'EL CHACO', 15), (172, 'QUIJOS', 15), (173, 'CARLOS JULIO AROSEMENA TOLA', 15), (174, 'PASTAZA', 16), (175, 'MERA', 16), (176, 'SANTA CLARA', 16), (177, 'ARAJUNO', 16), (178, 'QUITO', 17), (179, 'CAYAMBE', 17), (180, 'MEJIA', 17), (181, 'PEDRO MONCAYO', 17), (182, 'RUMIÑAHUI', 17), (183, 'SAN MIGUEL DE LOS BANCOS', 17), (184, 'PEDRO VICENTE MALDONADO', 17), (185, 'PUERTO QUITO', 17), (186, 'AMBATO', 18), (187, 'BAÑOS DE AGUA SANTA', 18), (188, 'CEVALLOS', 18), (189, 'MOCHA', 18), (190, 'PATATE', 18), (191, 'QUERO', 18), (192, 'SAN PEDRO DE PELILEO', 18), (193, 'SANTIAGO DE PÍLLARO', 18), (194, 'TISALEO', 18), (195, 'ZAMORA', 19), (196, 'CHINCHIPE', 19), (197, 'NANGARITZA', 19), (198, 'YACUAMBI', 19), (199, 'YANTZAZA (YANZATZA)', 19), (200, 'EL PANGUI', 19), (201, 'CENTINELA DEL CÓNDOR', 19), (202, 'PALANDA', 19), (203, 'PAQUISHA', 19), (204, 'SAN CRISTÓBAL', 20), (205, 'ISABELA', 20), (206, 'SANTA CRUZ', 20), (207, 'LAGO AGRIO', 21), (208, 'GONZALO PIZARRO', 21), (209, 'PUTUMAYO', 21), (210, 'SHUSHUFINDI', 21), (211, 'SUCUMBÍOS', 21), (212, 'CASCALES', 21), (213, 'CUYABENO', 21), (214, 'ORELLANA', 22), (215, 'AGUARICO', 22), (216, 'LA JOYA DE LOS SACHAS', 22), (217, 'LORETO', 22), (218, 'SANTO DOMINGO', 23), (219, 'SANTA ELENA', 24), (220, 'LA LIBERTAD', 24), (221, 'SALINAS', 24)",
        {
          type: QueryTypes.INSERT,
        }
      );
      console.log(`Ciudades Insertadas`);
    }

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

    console.log(`Tablas sincronizadas`);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  db,
  connect,
  syncTables,
};
