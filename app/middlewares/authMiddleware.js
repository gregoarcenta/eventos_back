const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(401);
      throw new Error("No se pudo encontrar el token");
    }

    const token = authorization.split(" ")[1];

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        const user = jwt.decode(token);
        req.user = user;
        req.expired = true;
        req.customError = error
        next();
      }
    }

  } catch (error) {
    next(error);
  }
};

exports.verifyTokenEmail = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(401);
      throw new Error("No se pudo encontrar el token");
    }
    const token = authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_MAIL_VERIF);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

exports.verifyTokenPassword = (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      res.status(401);
      throw new Error("No se pudo encontrar el token");
    }
    const token = authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_RESET_PASS);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
