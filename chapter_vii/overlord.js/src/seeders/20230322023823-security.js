'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    console.log('Security')

    const module = await queryInterface.sequelize.query(
      `select * from v_adm_modules 
      where name = 'Security';`
    )
    const security = module[0]

    await queryInterface.bulkInsert('adm_roles', [{
      role: 'role',
      observation: 'Role manager'
    }, {
      role: 'access',
      observation: 'User access'
    }, {
      role: 'rep_access',
      observation: 'Report of user access'
    }, {
      role: 'password',
      observation: 'Update password'
    }, {
      role: 'user',
      observation: 'User manager'
    }, {
      role: 'module',
      observation: 'Module manager'
    }], {}).then(async () => {
      await queryInterface.bulkInsert('adm_modules', [
        { name: 'Manage', module_id: security[0].id }
      ], { returning: true }).then(async (value) => {
        console.log('Manage', value[0])

        await queryInterface.bulkInsert('adm_modules', [
          { name: 'Users', icon: 'pi pi-fw pi-users', link: '/security/administer/user', role: 'usuario', module_id: value[0].id },
          { name: 'Modules', icon: 'pi pi-fw pi-box', link: '/security/administer/module', role: 'modulo', module_id: value[0].id }
        ], { })
      })

      await queryInterface.bulkInsert('adm_modules', [
        { name: 'Transaction', module_id: security[0].id }
      ], { returning: true }).then(async (value) => {
        console.log('Transaction', value[0])
        await queryInterface.bulkInsert('adm_modules', [
          { name: 'Password', role: 'password', module_id: value[0].id },
          { name: 'Access', role: 'access', module_id: value[0].id }
        ], {})
      })

      await queryInterface.bulkInsert('adm_modules', [
        { name: 'Report', module_id: security[0].id }
      ], { returning: true }).then(async (value) => {
        console.log('Report', value[0])
        await queryInterface.bulkInsert('adm_modules', [
          { name: 'Access of Users', role: 'rep_access', module_id: value[0].id }
        ], {})
      })

      await queryInterface.bulkInsert('adm_modules', [
        { name: 'Parameters', module_id: security[0].id }
      ], { returning: true }).then(async (value) => {
        console.log('Parameters', value[0])
        await queryInterface.bulkInsert('adm_modules', [
          { name: 'Roles', role: 'role', module_id: value[0].id }
        ], {})
      })
    })
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op

    const resultRows = await queryInterface.sequelize.query(
      `select * from v_adm_modules 
      where parent = 'Security';`
    )

    const securityModule = resultRows[0]

    if (securityModule.length > 0) {
      await securityModule.forEach(value => {
        queryInterface.bulkDelete('adm_modules',
          {
            module_id: { [Op.in]: [value.id] }
          }, {})
      })

      const module = await queryInterface.sequelize.query(
        `select * from v_adm_modules
        where name = 'Security';`
      )
      const item = module[0]

      await queryInterface.bulkDelete('adm_modules',
        {
          module_id: { [Op.in]: [item[0].id] }
        }, {})
    }
  }
}
