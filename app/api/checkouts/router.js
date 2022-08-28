const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { auth } = require("../../middlewares/auth");

/* GET home page. */
router.post("/checkouts", auth, controller.checkout);

module.exports = router;
