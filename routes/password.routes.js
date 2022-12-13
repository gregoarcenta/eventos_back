const express = require("express");
const { checkSchema } = require("express-validator");
const {
  recoverSchema,
  resetPasswordSchema,
} = require("../app/validations/resetPassword");
const { verifyTokenPassword } = require("../app/middlewares/authMiddleware");
const resetPasswordController = require("../app/controllers/resetPasswordController");

const {
  fieldsValidator,
} = require("../app/middlewares/fieldsValidatorMiddleware");

const router = express.Router();

router
  .route("/")
  .post(
    checkSchema(recoverSchema),
    fieldsValidator,
    resetPasswordController.verifyTokenPassword,
    resetPasswordController.create
  )
  .put(
    verifyTokenPassword,
    checkSchema(resetPasswordSchema),
    fieldsValidator,
    resetPasswordController.resetPassword
  );

module.exports = router;
