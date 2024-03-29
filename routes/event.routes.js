const express = require("express");
const { checkSchema } = require("express-validator");
const eventController = require("../app/controllers/eventController");
const userController = require("../app/controllers/userController");
const { verifyAdmin } = require("../app/middlewares/adminMiddleware");
const { verifyToken } = require("../app/middlewares/authMiddleware");
const { verifyUser } = require("../app/middlewares/userMiddleware");

const {
  fieldsValidator
} = require("../app/middlewares/fieldsValidatorMiddleware");
const { registerEventSchema } = require("../app/validations/event");
const { verifyOwnEvent } = require("../app/middlewares/ownEventMiddleware");

const router = express.Router();

router
  .route("/")
  .get(verifyToken, verifyAdmin, eventController.getAllEvents)
  .put(verifyToken, verifyUser, verifyOwnEvent, eventController.update)
  .post(
    verifyToken,
    checkSchema(registerEventSchema),
    fieldsValidator,
    verifyUser,
    eventController.create
  );
router
  .route("/general")
  .put(
    verifyToken,
    verifyUser,
    verifyOwnEvent,
    eventController.updateGeneralData
  );
router
  .route("/place")
  .put(
    verifyToken,
    verifyUser,
    verifyOwnEvent,
    eventController.updatePlaceData
  );
router
  .route("/localities")
  .put(
    verifyToken,
    verifyUser,
    verifyOwnEvent,
    eventController.updateLocalitiesData
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
router.route("/cities").get(eventController.getCitiesEvents);
router.route("/search/publish").post(eventController.searchEventsPublish);
router.route("/:id").get(eventController.getEventPublishById);

module.exports = router;
