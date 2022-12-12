const jwt = require("jsonwebtoken");

const { response } = require("../middlewares/responseMiddleware");
const User = require("../models/User");

async function verifyEmail(req, res, next) {
  try {
    const { id } = req.user;
    const user = await User.findOne({ where: { id } });
    if (!user) return next();
    if (user.email_verif) {
      res.status(412);
      throw new Error("the email is already verified");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

async function sendToken(req, res, next) {
  try {
    if (!req.user) throw new Error("email could not be verified");

    await User.update({ email_verif: true }, { where: { id: req.user.id } });

    const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    response(res, { token }, "Email verificado");
  } catch (error) {
    next(error);
  }
}

module.exports = {
  verifyEmail,
  sendToken,
};
