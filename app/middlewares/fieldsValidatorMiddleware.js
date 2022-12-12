const { validationResult } = require("express-validator");
exports.fieldsValidator = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      throw new Error(errors.array()[0].msg);
    }
    next();
  } catch (error) {
    next(error);
  }
};
