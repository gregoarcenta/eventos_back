const express = require("express");
const fileUpload = require("express-fileupload");
const uploadController = require("../app/controllers/uploadController");
const { validateFile } = require("../app/middlewares/uploadFileMiddleware");
const { verifyToken } = require("../app/middlewares/authMiddleware");
const { verifyAdmin } = require("../app/middlewares/adminMiddleware");

const router = express.Router();
router.use(fileUpload());

router
  .route("/eventos")
  .post(verifyToken, validateFile, uploadController.uploadFile);

router
  .route("/eventos/:id")
  .get(uploadController.returnFile)
  .post(verifyToken, uploadController.deleteFileIfNotExists)
  .put(verifyToken, validateFile, uploadController.updateFile)
  .delete(verifyToken, verifyAdmin, uploadController.deleteFile)

module.exports = router;
