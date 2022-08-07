"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Books",
      [
        {
          title: "The Lord of the Rings",
          author: "J.R.R. Tolkien",
          image: "uploads/the-lord-of-the-rings.jpg",
          published: new Date(),
          price: 150000,
          stock: 10,
          category: 1,
          user: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "The Hobbit",
          author: "Fran Walsh",
          image: "uploads/the-hobbit.jpg",
          published: new Date(),
          price: 100000,
          stock: 10,
          category: 1,
          user: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Computer Science in C",
          author: "Dennis Ritchie",
          image: "uploads/computer-science-in-c.jpg",
          published: new Date(),
          price: 150000,
          stock: 10,
          category: 2,
          user: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Agriculture for Beginners",
          author: "John Doe",
          image: "uploads/image 1.jpg",
          published: new Date(),
          price: 100000,
          stock: 10,
          category: 3,
          user: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Selena and Nebula",
          author: "Danielle Steel",
          image: "uploads/images 6.jpg",
          published: new Date(),
          price: 100000,
          stock: 10,
          category: 3,
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
