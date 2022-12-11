const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const Role = require("../models/Role");
const User = require("../models/User");
const { response } = require("../middlewares/response");

async function authenticate(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  let match = null;
  try {
    const user = await User.findOne({ where: { username }, include: [Role] });
    if (user) match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Invalid Credentials");
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

function generateToken(req, res, next) {
  if (!req.user) return next();
  req.token = jwt.sign(
    { id: req.user.id, role: req.user.role.name },
    process.env.JWT_SECRET
  );
  next();
}

function sendToken(req, res, next) {
  try {
    if (!req.user || !req.token) {
      res.status(422);
      throw new Error("Could not get user");
    }
    response(res, { user: req.user, jwt: req.token }, null);
  } catch (error) {
    next(error);
  }
}

function validToken(req, res, next) {
  try {
    if (!req.headers.authorization) throw new Error("Token not found");
    const token = req.headers.authorization.split(" ");
    const { id } = jwt.verify(token[1], process.env.JWT_SECRET);
    req.idUser = id;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  authenticate,
  generateToken,
  sendToken,
  validToken,
};
