const express = require("express");
const cityController = require("../app/controllers/cityController");

const router = express.Router();

router.route("/:province_id").get(cityController.getAllCitiesByIdProvince);

module.exports = router;
