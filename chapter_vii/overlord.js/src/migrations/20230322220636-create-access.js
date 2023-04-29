'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('adm_access', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      read: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      create: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      modify: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      delete: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'user_id',
        onDelete: 'CASCADE',
        references: {
          model: 'adm_users',
          key: 'id',
          as: 'id'
        }
      },
      moduleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'module_id',
        onDelete: 'CASCADE',
        references: {
          model: 'adm_modules',
          key: 'id',
          as: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('adm_access')
  }
}
