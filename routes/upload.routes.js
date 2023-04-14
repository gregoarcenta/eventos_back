const express = require("express");
const { checkSchema } = require("express-validator");
const {
  updateSchema,
  updateImgProfileSchema,
} = require("../app/validations/user");
const uploadController = require("../app/controllers/uploadController");

const {
  fieldsValidator,
} = require("../app/middlewares/fieldsValidatorMiddleware");
const { verifyToken } = require("../app/middlewares/authMiddleware");

const router = express.Router();

router.route("/eventos/:id").put(
  verifyToken,
  /* checkSchema(updateSchema),
    fieldsValidator, */
  uploadController.uploadFile
  // userController.update
);

module.exports = router;
