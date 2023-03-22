'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('adm_modules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING,
        references: {
          model: 'adm_roles',
          key: 'role',
          as: 'role'
        }
      },
      icon: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      observation: {
        type: Sequelize.STRING
      },
      status: {
        allowNull: false,
        type: Sequelize.STRING
      },
      moduleId: {
        type: Sequelize.INTEGER,
        field: 'module_id',
        references: {
          model: 'adm_modules',
          key: 'id',
          as: 'id'
        }
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('adm_modules', {
      cascade: true
    })
  }
}
