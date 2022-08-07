"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          name: "Business and Economics",
          user: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Computer Science",
          user: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Art Design",
          user: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Agriculture",
          user: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
