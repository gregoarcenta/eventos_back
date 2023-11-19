const Role = require("../models/Role");
const User = require("../models/User");

exports.verifyUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      include: [Role]
    });

    if (!user) {
      res.status(404);
      throw new Error("User Not Found");
    }

    // Valida si tiene verificado el email
    if (!user.email_verif) {
      res.status(401);
      throw new Error("Tu cuenta aun no está verificada");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};