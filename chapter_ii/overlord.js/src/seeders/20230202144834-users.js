'use strict'

/** @type {import('sequelize-cli').Migration} */
const password = 'HastaLaVista88'
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('adm_users', [{
      username: 'system',
      password,
      email: 'friend@mestizos.dev',
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adm_users', null, {})
  }
}
