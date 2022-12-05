const Role = require("../app/models/Role");
const User = require("../app/models/User");

Role.hasOne(User, {
  foreignKey: {
    allowNull: false,
    name: "role_id",
  },
});
User.belongsTo(Role, {
  foreignKey: {
    allowNull: false,
    name: "role_id",
  },
});
