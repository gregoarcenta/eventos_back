const Role = require("../models/Role");
const User = require("../models/User");

async function find(req, res, next) {
  try {
    const user = await User.findOne({
      where: { id: req.idUser },
      include: [Role],
    });
    if (!user) next();
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  find,
};
