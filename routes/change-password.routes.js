const express = require("express");
const { checkSchema } = require("express-validator");
const { verifyToken } = require("../app/middlewares/authMiddleware");
const changePasswordController = require("../app/controllers/changePasswordController");

const {
  changePasswordSchema,
  updatePasswordSchema,
} = require("../app/validations/changePassword");

const {
  fieldsValidator,
} = require("../app/middlewares/fieldsValidatorMiddleware");
const { verifyUser } = require("../app/middlewares/userMiddleware");

const router = express.Router();

router
  .route("/")
  .post(
    verifyToken,
    checkSchema(changePasswordSchema),
    fieldsValidator,
    verifyUser,
    changePasswordController.verifyPassword
  )
  .put(
    verifyToken,
    checkSchema(updatePasswordSchema),
    fieldsValidator,
    verifyUser,
    changePasswordController.changePassword
  );

module.exports = router;
