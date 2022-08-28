const express = require("express");
const router = express.Router();
const { auth } = require("../../middlewares/auth");
const controller = require("./controller");
const uploadMiddleware = require("../../middlewares/multer");

router.post(
  "/upload",
  auth,
  uploadMiddleware.single("image"),
  controller.uploadImage
);

module.exports = router;
