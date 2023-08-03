const { response } = require("../middlewares/responseMiddleware");
const bcrypt = require("bcrypt");
const User = require("../models/User");

// Verifica si ya existe un token valido para ya no crear otro hasta que expire
async function verifyPassword(req, res, next) {
  try {
    const { password } = req.body;

    if (!req.user) {
      res.status(404);
      throw new Error(
        "El usuario con el que intentas crear el evento no existe"
      );
    }

    if (!bcrypt.compareSync(password, req.user.password)) {
      response(res, { valid: false }, null);
    } else {
      response(res, { valid: true }, null);
    }
  } catch (error) {
    next(error);
  }
}

// Actuqaliza la contrasena
async function changePassword(req, res, next) {
  try {
    const { password } = req.body;

    if (!req.user) {
      res.status(404);
      throw new Error(
        "El usuario con el que intentas crear el evento no existe"
      );
    }

    if (bcrypt.compareSync(password, req.user.password)) {
      res.status(404);
      throw new Error("La nueva contraseña no puede ser igual que la anterior");
    }

    const hash = await bcrypt.hash(password, 10);
    User.update(
      { password: hash, jwt_reset_token: null, jwt_reset_token_valid: false },
      { where: { id: req.user.id } }
    );

    response(res, null, "Contraseña actualizada!");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  verifyPassword,
  changePassword,
};
