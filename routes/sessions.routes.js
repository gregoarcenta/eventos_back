const express = require("express");
const { checkSchema } = require("express-validator");
const { authSchema } = require("../app/validations/user");
const { verifyToken } = require("../app/middlewares/authMiddleware");
const sessionsController = require("../app/controllers/sessionsController");
const userController = require("../app/controllers/userController");
const {
  fieldsValidator,
} = require("../app/middlewares/fieldsValidatorMiddleware");

const router = express.Router();

router
  .route("/")
  .post(
    checkSchema(authSchema),
    fieldsValidator,
    sessionsController.authenticate,
    sessionsController.generateToken,
    sessionsController.sendToken
  );

router
  .route("/renew")
  .get(
    verifyToken,
    userController.find,
    sessionsController.generateToken,
    sessionsController.sendToken
  );

module.exports = router;
