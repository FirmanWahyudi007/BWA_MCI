const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { auth } = require("../../middlewares/auth");

/* GET home page. */
router.get("/categories", controller.getAllCategories);
router.post("/categories", auth, controller.createCategories);
router.put("/categories/:id", auth, controller.updateCategories);
router.delete("/categories/:id", auth, controller.deleteCategories);

module.exports = router;
