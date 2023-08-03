const express = require("express");
const { checkSchema } = require("express-validator");
const { verifyToken } = require("../app/middlewares/authMiddleware");
const changePasswordController = require("../app/controllers/changePasswordController");
const userController = require("../app/controllers/userController");

const {
  changePasswordSchema,
  updatePasswordSchema,
} = require("../app/validations/changePassword");

const {
  fieldsValidator,
} = require("../app/middlewares/fieldsValidatorMiddleware");

const router = express.Router();

router
  .route("/")
  .post(
    verifyToken,
    checkSchema(changePasswordSchema),
    fieldsValidator,
    userController.find,
    changePasswordController.verifyPassword
  )
  .put(
    verifyToken,
    checkSchema(updatePasswordSchema),
    fieldsValidator,
    userController.find,
    changePasswordController.changePassword
  );

module.exports = router;
