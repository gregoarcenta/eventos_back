const { response } = require("../middlewares/responseMiddleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Role = require("../models/Role");
const User = require("../models/User");
const { verifyMail } = require("../utils/sendMail");

async function find(req, res, next) {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      include: [Role],
      attributes: { exclude: ["password"] },
    });
    if (!user) return next();

    // Valida si tiene verificado el email
    if (!user.email_verif) {
      res.status(401);
      throw new Error("Cuenta aun no verificada");
    }
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
    const user = await User.create(
      { ...body, password: hash, role_id: 2 },
      {
        fields: ["name", "surname", "email", "username", "password", "role_id"],
      }
    );
    const token = jwt.sign({ id: user.id }, process.env.JWT_MAIL_VERIF, {
      expiresIn: "3h",
    });
    const responseMail = await verifyMail(token, user.email);
    if (responseMail.accepted.length === 0) {
      await User.destroy({ where: { id: user.id } });
      throw new Error("Ocurrio un error durante el registro");
    }
    response(res, null, "Cuenta creada con exito!", 201);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  find,
  create,
};
