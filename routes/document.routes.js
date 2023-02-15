const express = require("express");
const documentsController = require("../app/controllers/documentsController");

const router = express.Router();

router.route("/").get(documentsController.getAllDocuments);

module.exports = router;
