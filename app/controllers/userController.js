const { response } = require("../middlewares/response");
const bcrypt = require("bcrypt");
const Role = require("../models/Role");
const User = require("../models/User");

async function find(req, res, next) {
  try {
    const user = await User.findOne({
      where: { id: req.idUser },
      include: [Role],
      attributes: { exclude: ["password"] },
    });
    if (!user) next();
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

async function create(req, res, next) {
  try {
    const { password, ...body } = req.body;
    const hash = await bcrypt.hash(password, 10);
    await User.create(
      { ...body, password: hash, role_id: 2 },
      {
        fields: ["name", "surname", "email", "username", "password", "role_id"],
      }
    );
    response(res, null, "Registro exitoso!", 201);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  find,
  create,
};
