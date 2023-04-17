const Role = require("../app/models/Role");
const User = require("../app/models/User");
const Document = require("../app/models/Document");
const Contact = require("../app/models/Contact");
const Service = require("../app/models/Service");
const Province = require("../app/models/Province");
const City = require("../app/models/City");
const Event = require("../app/models/Event");
const Place = require("../app/models/Place");
const Direction = require("../app/models/Direction");

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
 * Un servicio puede ser solicitado por muchos contactos
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

/**
 *
 *
 * EVENTOS
 *
 *
 */

/**
 *
 * Un evento solo puede estar asigando a un solo lugar
 * y un lugar puede estar asignado a varios eventos pero con distintos horarios
 *
 */

Place.hasOne(Event, {
  foreignKey: {
    allowNull: false,
    name: "place_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
Event.belongsTo(Place, {
  foreignKey: {
    allowNull: false,
    name: "place_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

/**
 *
 * Un evento ofrece un solo servicio y un servico puede ser ofrecido por varios eventos
 *
 */

Service.hasOne(Event, {
  foreignKey: {
    allowNull: false,
    name: "service_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
Event.belongsTo(Service, {
  foreignKey: {
    allowNull: false,
    name: "service_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});


/**
 *
 * Un usuario solo puede tener muchos lugares para realizar eventos
 * y un lugar puede estar asignado a un usuario
 * Permite nulos porque existen places por fefecto que no les pertenecen a ningun usuario
 *
 */

User.hasMany(Place, {
  foreignKey: {
    allowNull: true,
    name: "user_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
Place.belongsTo(User, {
  foreignKey: {
    allowNull: true,
    name: "user_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

/**
 *
 * Un lugar solo tiene una direccion
 *
 */

Place.hasOne(Direction, {
  foreignKey: {
    allowNull: false,
    name: "place_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
Direction.belongsTo(Place, {
  foreignKey: {
    allowNull: false,
    name: "place_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

/**
 *
 * Una provincia puede tener muchas direcciones para eventos
 *
 */

Province.hasMany(Direction, {
  foreignKey: {
    allowNull: false,
    name: "province_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
Direction.belongsTo(Province, {
  foreignKey: {
    allowNull: false,
    name: "province_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

/**
 *
 * Una ciudad puede tener muchas direcciones para eventos
 *
 */

City.hasMany(Direction, {
  foreignKey: {
    allowNull: false,
    name: "city_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});
Direction.belongsTo(City, {
  foreignKey: {
    allowNull: false,
    name: "city_id",
  },
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
});

