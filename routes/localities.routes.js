const express = require("express");
const localitiesController = require("../app/controllers/localitiesController");


const router = express.Router();

router.route("/").get(localitiesController.getAllLocalities);

module.exports = router;
