const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { auth } = require("../../middlewares/auth");

/* GET home page. */
router.get("/categories", auth, function (req, res) {
  res.status(200).json({ message: "Categories" });
});

module.exports = router;
