'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    console.log('Security')

    const module = await queryInterface.sequelize.query(
      `select * from adm_modules 
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
        await queryInterface.bulkInsert('adm_modules', [
          {
            name: 'Users',
            icon: 'pi pi-fw pi-users',
            link: '/security/administer/user',
            role: 'user',
            module_id: value[0].id
          },
          {
            name: 'Modules',
            icon: 'pi pi-fw pi-box',
            link: '/security/administer/module',
            role: 'module',
            module_id: value[0].id
          }
        ], { })
      })

      await queryInterface.bulkInsert('adm_modules', [
        { name: 'Transaction', module_id: security[0].id }
      ], { returning: true }).then(async (value) => {
        await queryInterface.bulkInsert('adm_modules', [
          { name: 'Password', role: 'password', module_id: value[0].id },
          { name: 'Access', role: 'access', module_id: value[0].id }
        ], {})
      })

      await queryInterface.bulkInsert('adm_modules', [
        { name: 'Report', module_id: security[0].id }
      ], { returning: true }).then(async (value) => {
        await queryInterface.bulkInsert('adm_modules', [
          { name: 'Access of Users', role: 'rep_access', module_id: value[0].id }
        ], {})
      })

      await queryInterface.bulkInsert('adm_modules', [
        { name: 'Parameters', module_id: security[0].id }
      ], { returning: true }).then(async (value) => {
        await queryInterface.bulkInsert('adm_modules', [
          { name: 'Roles', role: 'role', module_id: value[0].id }
        ], {})
      })
    })
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op

    const resultRows = await queryInterface.sequelize.query(
      `WITH RECURSIVE subordinates AS (
      SELECT
      id,
      module_id,
      name,
      null::varchar as parent,
      name::varchar as path,
      role,
      1 as level,
      icon,
      link,
      status
      FROM
      adm_modules
      where module_id is null
      UNION all
      SELECT
      e.id,
      e.module_id,
      e.name,
      (select f.name from adm_modules f where id = e.module_id)::varchar as parent,
      (
      s.path || ' -> ' || e.name
      )::varchar as path,
      e.role,
      s.level + 1 AS level,
      e.icon,
      e.link,
      e.status
      FROM adm_modules e
      INNER JOIN subordinates s ON s.id = e.module_id
      ) SELECT * FROM subordinates
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
        `select * from adm_modules
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
