const express = require("express");
const JenkinsController = require("../app/controllers/JenkinsController");

const router = express.Router();

router.route("/front").post(JenkinsController.buidlFront);
router.route("/back").post(JenkinsController.buidlBack);

module.exports = router;
