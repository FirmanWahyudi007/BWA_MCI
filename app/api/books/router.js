const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { auth } = require("../../middlewares/auth");

/* GET home page. */
router.get("/books", controller.getAllBooks);
router.post("/books", auth, controller.createBook);
router.put("/books/:id", auth, controller.updateBook);
router.delete("/books/:id", auth, controller.deleteBook);

module.exports = router;
