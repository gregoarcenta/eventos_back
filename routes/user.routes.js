const express = require("express");
const { checkSchema } = require("express-validator");
const {
  updateSchema,
  updateImgProfileSchema
} = require("../app/validations/user");
const userController = require("../app/controllers/userController");
const { verifyUser } = require("../app/middlewares/userMiddleware");

const {
  fieldsValidator
} = require("../app/middlewares/fieldsValidatorMiddleware");
const { verifyToken } = require("../app/middlewares/authMiddleware");

const router = express.Router();

router.route("/find-by-email/:email").get(userController.getUserByEmail);

router
  .route("/find-by-username/:username")
  .get(userController.getUserByUsername);

router
  .route("/find-by-document/:num_document")
  .get(userController.getUserByDocument);

router
  .route("/update-img-profile")
  .put(
    verifyToken,
    checkSchema(updateImgProfileSchema),
    fieldsValidator,
    verifyUser,
    userController.updateImgProfile
  );

router
  .route("/")
  .post(verifyToken, userController.getUsersByUsernameOrName)
  .put(
    verifyToken,
    checkSchema(updateSchema),
    fieldsValidator,
    verifyUser,
    userController.update
  );

module.exports = router;
