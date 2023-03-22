'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('adm_roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      observation: {
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('adm_roles')
  }
}
