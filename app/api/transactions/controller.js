const { Transaction, DetailTransaction } = require("../../db/models");
const { Op } = require("sequelize");

module.exports = {
  getTransactionLists: async (req, res, next) => {
    try {
      const { keyword = "" } = req.query;
      let condition = {
        user: req.user.id,
      };
      if (keyword !== "") {
        condition = { ...condition, invoice: { [Op.like]: `%${keyword}%` } };
      }
      const transactions = await Transaction.findAll({
        where: condition,
        include: [
          {
            model: DetailTransaction,
            as: "detailTransaction",
          },
        ],
      });
      res.status(200).json({
        message: "Get all transactions success",
        data: transactions,
      });
    } catch (err) {
      next(err);
    }
  },
  detailTransaction: async (req, res, next) => {
    try {
      const { id } = req.params;
      const transactions = await Transaction.findOne({
        where: { id },
        include: [
          {
            model: DetailTransaction,
            as: "detailTransaction",
          },
        ],
      });
      res.status(200).json({
        message: "Get detail transactions success",
        data: transactions,
      });
    } catch (err) {
      next(err);
    }
  },
};
