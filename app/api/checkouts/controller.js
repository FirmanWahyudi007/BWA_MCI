const { Transaction, DetailTransaction, Book } = require("../../db/models");
const { Op } = require("sequelize");
const sequelize = require("../../db/models").sequelize;

module.exports = {
  checkout: async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
      const { payload } = req.body;
      const user = req.user.id;

      const transaction = await Transaction.create(
        {
          invoice: `T-${Math.floor(100000 + Math.random() * 900000)}`,
          date: new Date(),
          user: user,
        },
        { transaction: t }
      );

      let erroBookIdNotFound = [],
        erroBookStockNotEnough = [],
        updateBookStock = [];
      for (let i = 0; i < payload.length; i++) {
        const checkingBook = await Book.findOne({
          where: {
            id: payload[i].bookId,
            user: user,
          },
        });

        //add field detailtransaction
        payload[i].transaction = transaction.id;
        payload[i].user = user;
        payload[i].book = payload[i].bookId;
        payload[i].titleBook = checkingBook?.title ?? "";
        payload[i].authorBook = checkingBook?.author ?? "";
        payload[i].imageBook = checkingBook?.image ?? "";
        payload[i].priceBook = checkingBook?.price ?? "";

        updateBookStock.push({
          id: payload[i].bookId,
          stock: checkingBook?.stock - payload[i]?.quantity,
          title: checkingBook?.title,
        });

        if (payload[i]?.quantity > checkingBook?.stock) {
          erroBookStockNotEnough.push(
            `${payload[i]?.quantity} - ${checkingBook?.stock}`
          );
        }
        if (!checkingBook) {
          erroBookIdNotFound.push(payload[i]?.bookId);
        }
      }

      if (erroBookStockNotEnough.length !== 0) {
        return res.status(400).json({
          message: `Book stock not enough ${erroBookStockNotEnough.join(
            ", "
          )} and user ${user}`,
        });
      }
      if (erroBookIdNotFound.length !== 0) {
        return res.status(400).json({
          message: `Book not found with id ${erroBookIdNotFound.join(
            ", "
          )} and user ${user}`,
        });
      }

      await Book.bulkCreate(
        updateBookStock,
        {
          updateOnDuplicate: ["stock"],
        },
        { transaction: t }
      );
      const detailtransaction = await DetailTransaction.bulkCreate(payload, {
        transaction: t,
      });
      await t.commit();
      res.status(200).json({
        message: "Checkout success",
        data: detailtransaction,
      });
    } catch (error) {
      if (t) {
        await t.rollback();
      }
      next(error);
    }
  },
};
