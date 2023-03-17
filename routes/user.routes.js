const express = require("express");
const { checkSchema } = require("express-validator");
const { updateSchema, updateImgProfileSchema } = require("../app/validations/user");
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
  .route("/find-by-document/:num_document")
  .get(userController.getUserByDocument);

router
  .route("/update-img-profile")
  .put(
    verifyToken,
    checkSchema(updateImgProfileSchema),
    fieldsValidator,
    userController.find,
    userController.updateImgProfile
  );

router
  .route("/")
  .put(
    verifyToken,
    checkSchema(updateSchema),
    fieldsValidator,
    userController.find,
    userController.update
  );

module.exports = router;
