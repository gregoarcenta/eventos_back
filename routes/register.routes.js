const express = require("express");
const { checkSchema } = require("express-validator");
const userController = require("../app/controllers/userController");
const { registerSchema } = require("../app/validations/user");
const validatorFields = require("../app/middlewares/validatorFields");


const router = express.Router();

router.route("/").post(checkSchema(registerSchema), validatorFields, userController.create);
module.exports = router;
