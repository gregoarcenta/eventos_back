const express = require("express");
const { checkSchema } = require("express-validator");
const {
  updateSchema,
  updateImgProfileSchema,
} = require("../app/validations/user");
const eventController = require("../app/controllers/eventController");
const {
  fieldsValidator,
} = require("../app/middlewares/fieldsValidatorMiddleware");
const { verifyToken } = require("../app/middlewares/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(verifyToken, eventController.index)
  .post(verifyToken, eventController.create);

/* router
  .route("/")
  .put(
    verifyToken,
    checkSchema(updateSchema),
    fieldsValidator,
    userController.find,
    userController.update
  );
 */
module.exports = router;
