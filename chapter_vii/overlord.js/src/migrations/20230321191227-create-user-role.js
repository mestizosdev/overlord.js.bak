'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('adm_user_roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'adm_roles',
          key: 'role',
          as: 'role'
        }
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'user_id',
        onDelete: 'CASCADE',
        references: {
          model: 'adm_users',
          key: 'id',
          as: 'id'
        }
      }
    })

    await queryInterface.addConstraint('adm_user_roles', {
      fields: ['role', 'user_id'],
      type: 'unique',
      name: 'user_roles_uk'
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('adm_user_roles')
  }
}
