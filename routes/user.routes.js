const express = require("express");
const { checkSchema } = require("express-validator");
const { updateSchema } = require("../app/validations/user");
const userController = require("../app/controllers/userController");
const {
  fieldsValidator,
} = require("../app/middlewares/fieldsValidatorMiddleware");
const { verifyToken } = require("../app/middlewares/authMiddleware");

const router = express.Router();

router.route("/find-by-email/:email").get(userController.getUserByEmail);

router
  .route("/find-by-username/:username")
  .get(userController.getUserByUsername);

router
  .route("/")
  .put(
    verifyToken,
    checkSchema(updateSchema),
    fieldsValidator,
    userController.update
  );

module.exports = router;
