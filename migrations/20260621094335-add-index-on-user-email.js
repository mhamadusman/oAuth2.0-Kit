'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex("users", {
      fields: ["email"],
      name: "email_index"
    })
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeIndex("users", "email_index")
  }
};
