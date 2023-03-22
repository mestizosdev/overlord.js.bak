'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('adm_modules', [{
      name: 'Principal',
      icon: 'pi pi-fw pi-home'
    }], {})

    const moduleMain = await queryInterface.sequelize.query(
      `select * from adm_modules 
      where name = 'Principal';`
    )

    const main = moduleMain[0]

    await queryInterface.bulkInsert('adm_modules', [
      { name: 'Management', icon: 'pi pi-fw pi-heart-fill', link: '/management/management', module_id: main[0].id },
      { name: 'Security', icon: 'pi pi-fw pi-lock', link: '/security/management', module_id: main[0].id }
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('adm_modules', null, {})
  }
}
