const { response } = require("../middlewares/responseMiddleware");
const sendMail = require("../utils/sendMail");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Verifica si ya existe un token valido para ya no crear otro hasta que expire
async function verifyTokenPassword(req, res, next) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (user.jwt_reset_token) {
      const decode = jwt.decode(user.jwt_reset_token);
      if (Date.now() >= decode.exp * 1000) {
        req.user = user;
        return next();
      } else {
        res.status(401);
        throw new Error("Ya tienes un token de restablecimiento en uso");
      }
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

// Crea el token para la recuperacion de la contrasena
async function create(req, res, next) {
  try {
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_RESET_PASS, {
      expiresIn: "10m",
    });
    const responseMail = await sendMail.resetPassword(token, req.user.email);

    if (responseMail.accepted.length === 0) {
      throw new Error("Ocurrio un error al enviar el correo de reseteo de contraseña");
    }

    await User.update(
      { jwt_reset_token: token, jwt_reset_token_valid: true },
      { where: { id: req.user.id } }
    );
    response(res, null, "Correo de recuperación de contraseña enviado!");
  } catch (error) {
    next(error);
  }
}

// Resetea la contrasena
async function resetPassword(req, res, next) {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user.jwt_reset_token_valid) {
      res.status(401);
      throw new Error("Ya has cambiado de contraseña");
    }
    const { password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    User.update(
      { password: hash, jwt_reset_token: null, jwt_reset_token_valid: false },
      { where: { id: req.user.id } }
    );
    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    response(res, { token }, "Contraseña actualizada!");
  } catch (error) {
    next(error);
  }
}

// Verifica que el token del usuario este activo para cambio de clave
async function isValidResetToken(req, res, next) {
  try {
    const user = await User.findOne({
      where: { id: req.user.id, jwt_reset_token_valid: true },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      res.status(404);
      throw new Error("Ya has cambiado de contraseña");
    }

    response(res, user, "El token es valido");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  create,
  resetPassword,
  isValidResetToken,
  verifyTokenPassword,
};
