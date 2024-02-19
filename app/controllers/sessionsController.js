const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { response } = require("../middlewares/responseMiddleware");
const { Op } = require("sequelize");
require("dotenv").config();

const Role = require("../models/Role");
const User = require("../models/User");
const { excludeFieldsUser } = require("../utils/utils");
const { googleVerify } = require("../utils/googleVerify");

async function authenticateGoogle(req, res, next) {
  try {
    const { email, picture, given_name, family_name } = await googleVerify(
      req.body.tokenGoogle
    );

    const user = await User.findOne({ where: { email } });

    if (!user) {
      const newUser = await User.create(
        {
          name: given_name,
          surname: family_name,
          email,
          img: picture,
          google: true,
          email_verif: true,
          username: `${given_name}${family_name}${new Date().getTime()}`,
          password: "@@@",
          role_id: 2
        },
        {
          fields: [
            "name",
            "surname",
            "email",
            "img",
            "google",
            "email_verif",
            "username",
            "password",
            "role_id"
          ]
        }
      );
      req.user = newUser;
      return next();
    } else if (user.google) {
      req.user = user;
      return next();
    }

    res.status(422);
    throw new Error("El usuario ya cuenta con ese email registrado");

  } catch (error) {
    next(error);
  }
}

async function authenticate(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const user = await User.findOne({
      where: { [Op.or]: [{ username }, { email: username }] },
      include: [Role]
    });
    // Valida si existe o no el usuario
    if (!user) {
      res.status(422);
      throw new Error("Correo o usuario incorrecto");
    }

    const domain = req.headers.referer || req.headers.referrer;
    if (
      domain === "https://admin.eventosec.com/" &&
      user.role.name !== "ADMIN"
    ) {
      res.status(403);
      throw new Error("Acceso no valido");
    }

    // Valida si tiene verificado el email
    if (!user.email_verif) {
      res.status(401);
      throw new Error(
        "Tienes que confirmar tu cuenta con el enlace que te hemos enviado a tu correo electrónico"
      );
    }

    // Valida si la contraseña es correcta
    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401);
      throw new Error("Contraseña incorrecta");
    }
    user.password = undefined;
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

function generateToken(req, res, next) {
  req.token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h"
  });
  next();
}

function sendToken(req, res, next) {
  try {
    const user = excludeFieldsUser(req.user.toJSON());
    response(res, { user, jwt: req.token }, null);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authenticateGoogle,
  authenticate,
  generateToken,
  sendToken
};
