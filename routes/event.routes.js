const express = require("express");
const { checkSchema } = require("express-validator");
const eventController = require("../app/controllers/eventController");
const userController = require("../app/controllers/userController");

const {
  fieldsValidator,
} = require("../app/middlewares/fieldsValidatorMiddleware");
const { verifyToken } = require("../app/middlewares/authMiddleware");
const { registerEventSchema } = require("../app/validations/event");

const router = express.Router();

router
  .route("/")
  .get(verifyToken, eventController.index)
  .post(
    verifyToken,
    checkSchema(registerEventSchema),
    fieldsValidator,
    userController.find,
    eventController.create
  );

router
  .route("/:term")
  .get(verifyToken, eventController.searchEvent)
module.exports = router;
