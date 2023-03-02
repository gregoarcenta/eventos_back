const express = require("express");
const servicesController = require("../app/controllers/servicesController");

const router = express.Router();

router.route("/").get(servicesController.getAllServices);

module.exports = router;
