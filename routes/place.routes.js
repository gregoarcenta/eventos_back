const express = require("express");
const placeController = require("../app/controllers/placeController");
const { verifyToken } = require("../app/middlewares/authMiddleware");


/* const { checkSchema } = require("express-validator");
const { registerEventSchema } = require("../app/validations/event");
const {
  fieldsValidator,
} = require("../app/middlewares/fieldsValidatorMiddleware"); */

const router = express.Router();

// router
//   .route("/")
//   .get(verifyToken, eventController.index)
//   .post(
//     verifyToken,
//     checkSchema(registerEventSchema),
//     fieldsValidator,
//     userController.find,
//     eventController.create
//   );
  
router.route("/:id").get(verifyToken, placeController.getPlaceById);

router.route("/search/:term").get(verifyToken, placeController.getAllPlaces);

module.exports = router;
