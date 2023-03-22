'use strict'
const passwordUtil = require('../utils/password')

/** @type {import('sequelize-cli').Migration} */
const password = 'HastaLaVista88'
module.exports = {
  async up (queryInterface, Sequelize) {
    const superRole = 'super'
    const usersResult = await queryInterface.bulkInsert('adm_users', [{
      username: 'system',
      password: await passwordUtil.encrypt(password),
      email: 'friend@mestizos.dev',
      status: true,
      created_at: new Date(),
      updated_at: new Date()
    }], { returning: true })

    await queryInterface.bulkInsert('adm_roles', [{
      role: superRole,
      observation: 'Access without restriction for all the modules',
      status: true
    }], {})

    await usersResult.forEach(value => {
      if (value.username === 'system') {
        queryInterface.bulkInsert('adm_user_roles', [{
          user_id: value.id,
          role: superRole
        }], {})
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('adm_users', null, {})
    await queryInterface.bulkDelete('adm_roles', null, {})
  }
}
