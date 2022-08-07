const { Category } = require("../../db/models");

module.exports = {
  getAllCategories: async (req, res, next) => {
    try {
      const categories = await Category.findAll({
        attributes: ["id", "name"],
        where: {
          user: req.user.id,
        },
      });
      res.status(200).json({
        message: "Get all categories success",
        data: categories,
      });
    } catch (err) {
      next(err);
    }
  },
  createCategories: async (req, res, next) => {
    try {
      const { name } = req.body;
      const createCategory = await Category.create({
        name: name,
        user: req.user.id,
      });
      res.status(200).json({
        message: "Create category success",
        data: createCategory,
      });
    } catch (err) {
      next(err);
    }
  },
  updateCategories: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const checkCategory = await Category.findOne({
        where: {
          id: id,
          user: req.user.id,
        },
      });
      if (!checkCategory) {
        res.status(403).json({ message: "Category not found" });
      }
      const updateCategory = await checkCategory.update({
        name: name,
      });
      res.status(200).json({
        message: "Update category success",
        data: updateCategory,
      });
    } catch (err) {
      next(err);
    }
  },
  deleteCategories: async (req, res, next) => {
    try {
      const { id } = req.params;
      const checkCategory = await Category.findOne({
        where: {
          id: id,
          user: req.user.id,
        },
      });
      if (!checkCategory) {
        res.status(403).json({ message: "Category not found" });
      }
      const destroyCategory = await checkCategory.destroy();
      res.status(200).json({
        message: "Delete category success",
        data: destroyCategory,
      });
    } catch (err) {
      next(err);
    }
  },
};
