const jwt = require('jsonwebtoken')


exports.verifyToken = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(401);
      throw new Error("Could not get Token");
    }
    const token = authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next()
  } catch (error) {
    next(error);
  }
};

exports.verifyTokenEmail = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(401);
      throw new Error("Could not get Token");
    }
    const token = authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_MAIL_VERIF);
    req.user = user;
    next()
  } catch (error) {
    next(error);
  }
};
