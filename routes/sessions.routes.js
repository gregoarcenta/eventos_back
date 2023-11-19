const express = require("express");
const { checkSchema } = require("express-validator");
const { authSchema } = require("../app/validations/user");
const { verifyToken } = require("../app/middlewares/authMiddleware");
const sessionsController = require("../app/controllers/sessionsController");
const { verifyUser } = require("../app/middlewares/userMiddleware");

const {
  fieldsValidator
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
    verifyUser,
    sessionsController.generateToken,
    sessionsController.sendToken
  );

module.exports = router;
