"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("verification", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      verificationToken: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      expiredAt: { type: Sequelize.DATE, allowNull: false },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
    await queryInterface.addIndex("verification", ["userId"]);
    await queryInterface.addIndex("verification", ["verificationToken"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("verification");
  },
};
