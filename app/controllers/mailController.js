const jwt = require("jsonwebtoken");

const { response } = require("../middlewares/responseMiddleware");
const User = require("../models/User");

async function verifyEmail(req, res, next) {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) return next();
    if (user.email_verif) {
      res.status(412);
      throw new Error("Su cuenta ya se encuentra verificada");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

async function sendToken(req, res, next) {
  try {
    if (!req.user) throw new Error("No se encontro la cuenta a verificar");

    await User.update({ email_verif: true }, { where: { id: req.user.id } });

    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    response(res, { token }, "Tu cuenta fue verificada con exito");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  verifyEmail,
  sendToken,
};
