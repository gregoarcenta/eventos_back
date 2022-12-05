const express = require("express");
const sessionsController = require("../app/controllers/sessionsController");
const userController = require("../app/controllers/userController");

const router = express.Router();

router
  .route("/")
  .post(
    sessionsController.authenticate,
    sessionsController.generateToken,
    sessionsController.sendToken
  );

router
  .route("/renew")
  .get(
    sessionsController.validToken,
    userController.find,
    sessionsController.generateToken,
    sessionsController.sendToken
  );

module.exports = router;
