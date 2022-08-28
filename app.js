const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const authRouter = require("./app/api/auth/router");
const categoriesRouter = require("./app/api/categories/router");
const booksRouter = require("./app/api/books/router");
const uploadsRouter = require("./app/api/uploads/router");
const checkoutRouter = require("./app/api/checkouts/router");
const transactionsRouter = require("./app/api/transactions/router");
const URL = `/api/V1/`;

const app = express();
const cors = require("cors");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the API Toko Buku" });
});
app.use(`${URL}`, authRouter);
app.use(`${URL}`, categoriesRouter);
app.use(`${URL}`, booksRouter);
app.use(`${URL}`, uploadsRouter);
app.use(`${URL}`, checkoutRouter);
app.use(`${URL}`, transactionsRouter);

module.exports = app;
