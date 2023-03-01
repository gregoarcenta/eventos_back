const Role = require("../app/models/Role");
const User = require("../app/models/User");
const Document = require("../app/models/Document");

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
