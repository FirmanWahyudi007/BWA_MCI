"use strict";
const bycrypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bycrypt.hashSync("admin", 10);
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "John Doe",
          email: "admin@gmail.com",
          password: password,
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Firman W",
          email: "firmanwa@gmail.com",
          password: password,
          role: "kasir",
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
