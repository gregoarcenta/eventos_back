const express = require("express");
const { checkSchema } = require("express-validator");
const { registerSchema } = require("../app/validations/user");
const userController = require("../app/controllers/userController");
const mailController = require("../app/controllers/verifyMailController");
const {
  fieldsValidator,
} = require("../app/middlewares/fieldsValidatorMiddleware");
const { verifyTokenEmail } = require("../app/middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(checkSchema(registerSchema), fieldsValidator, userController.create);

router
  .route("/verify")
  .get(verifyTokenEmail, mailController.verifyEmail, mailController.sendToken);

module.exports = router;
