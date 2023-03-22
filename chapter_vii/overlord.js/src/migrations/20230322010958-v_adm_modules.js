'use strict'

/** @type {import('sequelize-cli').Migration} */
const fs = require('fs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sql = fs.readFileSync('./src/sql/v_adm_modules.sql').toString()
    await queryInterface.sequelize.query(sql)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP VIEW v_adm_modules;')
  }
}
