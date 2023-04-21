const express = require("express");
const fileUpload = require("express-fileupload");
const uploadController = require("../app/controllers/uploadController");
const { validateFile } = require("../app/middlewares/uploadFileMiddleware");
const { verifyToken } = require("../app/middlewares/authMiddleware");

const router = express.Router();
router.use(fileUpload());

router
  .route("/eventos")
  .post(verifyToken, validateFile, uploadController.uploadFile);

router
  .route("/eventos/:id")
  .get(uploadController.returnFile)
  .put(verifyToken, validateFile, uploadController.updateFile)
  .delete(verifyToken, uploadController.deleteFile)

module.exports = router;
