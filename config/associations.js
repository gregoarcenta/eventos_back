const Role = require("../app/models/Role");
const User = require("../app/models/User");
const Document = require("../app/models/Document");
const Contact = require("../app/models/Contact");
const Service = require("../app/models/Service");
const Province = require("../app/models/Province");
const City = require("../app/models/City");

/**
 * 
 * Relations
 * User 1 -> 1 role 
 * User 1 -> 1 document
 * 
 */

// Un usuario tiene un solo tipo de rol
Role.hasOne(User, {
  foreignKey: {
    allowNull: false,
    name: "role_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
User.belongsTo(Role, {
  foreignKey: {
    allowNull: false,
    name: "role_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

// Un usuario tiene un solo tipo de documento
Document.hasOne(User, {
  foreignKey: {
    name: "document_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
User.belongsTo(Document, {
  foreignKey: {
    name: "document_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

/**
 * 
 * Relations
 * Province 1 -> M Cities
 * 
 */

// Una provincia tiene muchas ciudades
Province.hasMany(City, {
  foreignKey: {
    allowNull: false,
    name: "province_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
City.belongsTo(Province, {
  foreignKey: {
    allowNull: false,
    name: "province_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

/**
 * 
 * Relations
 * Service 1 -> M Contact 
 * City 1 -> M Contact
 * 
 */

/**
 * 
 * Un servicio los pueder solicitar muchos contactos 
 * y un contacto solo puede solicitar un servicio
 * 
 */
Service.hasMany(Contact, {
  foreignKey: {
    allowNull: false,
    name: "service_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
Contact.belongsTo(Service, {
  foreignKey: {
    allowNull: false,
    name: "service_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

/**
 * 
 * Una ciudad puede ser seleccionada por muchos contactos 
 * y un contacto solo puede seleccionar una ciudad
 * 
 */
City.hasMany(Contact, {
  foreignKey: {
    allowNull: false,
    name: "city_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
Contact.belongsTo(City, {
  foreignKey: {
    allowNull: false,
    name: "city_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

