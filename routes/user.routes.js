const express = require("express");
const { checkSchema } = require("express-validator");
const { registerSchema } = require("../app/validations/user");
const userController = require("../app/controllers/userController");
const mailController = require("../app/controllers/mailController");
const {
  fieldsValidator,
} = require("../app/middlewares/fieldsValidatorMiddleware");
const { verifyTokenEmail } = require("../app/middlewares/authMiddleware");

const router = express.Router();

router.route("/find-by-email/:email").get(userController.getUserByEmail);

router
  .route("/find-by-username/:username")
  .get(userController.getUserByUsername);

module.exports = router;
