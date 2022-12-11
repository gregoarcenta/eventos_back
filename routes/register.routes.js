const express = require("express");
const userController = require("../app/controllers/userController");

const router = express.Router();

router.route("/").post(userController.create);
module.exports = router;
