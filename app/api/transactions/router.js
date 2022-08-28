const express = require("express");
const router = express.Router();
const controller = require("./controller");
const { auth } = require("../../middlewares/auth");

/* GET home page. */
router.get("/transactions", auth, controller.getTransactionLists);
router.get("/transaction/:id", auth, controller.detailTransaction);
// router.post("/checkouts", auth, controller.checkout);
// router.put("/books/:id", auth, controller.updateBook);
// router.delete("/books/:id", auth, controller.deleteBook);

module.exports = router;
