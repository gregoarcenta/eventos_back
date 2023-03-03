const express = require("express");
const { checkSchema } = require("express-validator");
const contactController = require("../app/controllers/contactController");
const { verifyToken } = require("../app/middlewares/authMiddleware");

const {
  fieldsValidator,
} = require("../app/middlewares/fieldsValidatorMiddleware");
const { validateContactForm } = require("../app/middlewares/validateContactFormMiddleware");
const { createContactSchema } = require("../app/validations/contact");

const router = express.Router();

router
  .route("/")
  .get(verifyToken, contactController.index)
  .post(
    validateContactForm,
    checkSchema(createContactSchema),
    fieldsValidator,
    contactController.create
  );

module.exports = router;
