const { Book, Category } = require("../../db/models");
const { Op } = require("sequelize");

module.exports = {
  getAllBooks: async (req, res, next) => {
    try {
      const { keyword = "" } = req.query;
      let condition = {
        user: req.user.id,
      };
      if (keyword !== "") {
        condition = { ...condition, title: { [Op.like]: `%${keyword}%` } };
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
            attributes: ["name"],
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
};
