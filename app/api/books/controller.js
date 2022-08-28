const { Book, Category } = require("../../db/models");
const { Op } = require("sequelize");

module.exports = {
  getAllBooks: async (req, res, next) => {
    try {
      const { keyword = "", category = "" } = req.query;
      let condition = {};
      if (keyword !== "") {
        condition = { ...condition, title: { [Op.like]: `%${keyword}%` } };
      }

      if (category !== "") {
        condition = { ...condition, category: category };
      }

      const books = await Book.findAll({
        where: condition,
        attributes: [
          "id",
          "title",
          "author",
          "category",
          "published",
          "image",
          "price",
          "stock",
        ],
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
          },
        ],
      });
      res.status(200).json({
        message: "Get all books success",
        data: books,
      });
    } catch (err) {
      next(err);
    }
  },
  createBook: async (req, res, next) => {
    try {
      const { title, author, category, published, image, price, stock } =
        req.body;
      const checkCategory = await Category.findOne({
        where: { id: category, user: req.user.id },
      });
      if (!checkCategory) {
        return res.status(404).json({
          message: "Category not found",
        });
      }
      const book = await Book.create({
        title,
        author,
        category,
        published,
        image,
        price,
        stock,
        user: req.user.id,
      });
      res.status(201).json({
        message: "Create book success",
        data: book,
      });
    } catch (err) {
      next(err);
    }
  },
  updateBook: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, author, category, published, image, price, stock } =
        req.body;
      const checkCategory = await Category.findOne({
        where: { id: category, user: req.user.id },
      });
      if (!checkCategory) {
        return res.status(404).json({
          message: "Category not found",
        });
      }
      const book = await Book.findOne({
        where: { id, user: req.user.id },
      });
      if (!book) {
        return res.status(404).json({
          message: "Book not found",
        });
      }
      await book.update({
        title,
        author,
        category,
        published,
        image,
        price,
        stock,
      });
      res.status(200).json({
        message: "Update book success",
        data: book,
      });
    } catch (err) {
      next(err);
    }
  },
  deleteBook: async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await Book.findOne({
        where: { id, user: req.user.id },
      });
      if (!book) {
        return res.status(404).json({
          message: "Book not found",
        });
      }
      await book.destroy();
      res.status(200).json({
        message: "Delete book success",
      });
    } catch (err) {
      next(err);
    }
  },
};
