const express = require("express");
const JenkinsController = require("../app/controllers/JenkinsController");

const router = express.Router();

router.route("/").post(JenkinsController.buidlFront);

module.exports = router;
