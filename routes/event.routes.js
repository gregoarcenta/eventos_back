const express = require("express");
const { checkSchema } = require("express-validator");
const eventController = require("../app/controllers/eventController");
const userController = require("../app/controllers/userController");
const { verifyAdmin } = require("../app/middlewares/adminMiddleware");
const { verifyToken } = require("../app/middlewares/authMiddleware");

const {
  fieldsValidator,
} = require("../app/middlewares/fieldsValidatorMiddleware");
const { registerEventSchema } = require("../app/validations/event");
const { verifyOwnEvent } = require("../app/middlewares/ownEventMiddleware");

const router = express.Router();

router
  .route("/")
  .get(verifyToken, verifyAdmin, eventController.getAllEvents)
  .put(
    verifyToken,
    userController.find,
    verifyOwnEvent,
    eventController.update
  )
  .post(
    verifyToken,
    checkSchema(registerEventSchema),
    fieldsValidator,
    userController.find,
    eventController.create
  );
router
  .route("/search")
  .post(verifyToken, verifyAdmin, eventController.searchEvents);
router
  .route("/get-event/:id")
  .get(verifyToken, verifyAdmin, eventController.getEventById);

// Cliente - rutas publicas
router.route("/publish").get(eventController.getAllEventsPublish);
router.route("/featured").get(eventController.getFeaturedEvents);
router.route("/upcoming").get(eventController.getUpcomingEvents);
router.route("/search/publish").post(eventController.searchEventsPublish);
router.route("/:id").get(eventController.getEventPublishById);

module.exports = router;
