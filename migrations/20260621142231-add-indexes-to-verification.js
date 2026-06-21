"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("verification", {
      fields: ["userId"],
      name: "idx_verification_user_id", 
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addIndex("verification", {
      fields: ["verificationToken"],
      name: "idx_verification_token", 
    });
  },
};
