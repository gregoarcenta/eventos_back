const Role = require("../models/Role");
const User = require("../models/User");

exports.verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      include: [Role],
    })
    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }
    const responseUser = user.toJSON()

    if (responseUser.role.name !== "ADMIN") {
      res.status(403);
      throw new Error("Role not authorized");
    }

    next();
  } catch (error) {
    next(error);
  }
};
