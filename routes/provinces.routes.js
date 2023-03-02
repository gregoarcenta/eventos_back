const express = require("express");
const provincesController = require("../app/controllers/provincesController");

const router = express.Router();

router.route("/").get(provincesController.getAllProvinces);

module.exports = router;
