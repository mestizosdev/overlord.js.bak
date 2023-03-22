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
      { name: 'Administration', icon: 'pi pi-fw pi-heart-fill', link: '/administration/management', module_id: main[0].id },
      { name: 'Security', icon: 'pi pi-fw pi-lock', link: '/security/management', module_id: main[0].id }
    ], {})

    // const moduleAdmin = await queryInterface.sequelize.query(
    // `select * from v_modules
    // where name = 'Administración';`
    // )
    // const admin = moduleAdmin[0]
    //
    // await queryInterface.bulkInsert('modules', [
    // { name: 'Administrar', status: 'Activo', module_id: admin[0].id },
    // { name: 'Transacción', status: 'Activo', module_id: admin[0].id },
    // { name: 'Reporte', status: 'Activo', module_id: admin[0].id },
    // { name: 'Parámetro', status: 'Activo', module_id: admin[0].id }
    // ], {})
    //
    // await queryInterface.bulkInsert('roles', [{
    // rolename: 'proveedor',
    // observation: 'Acceso a la gestión de proveedores',
    // status: 'Activo'
    // }, {
    // rolename: 'vendedor',
    // observation: 'Acceso a la gestión de vendedores',
    // status: 'Activo'
    // }, {
    // rolename: 'factura_venta',
    // observation: 'Acceso para realizar una venta con factura',
    // status: 'Activo'
    // }, {
    // rolename: 'entrega_venta',
    // observation: 'Acceso para realizar una venta con entrega',
    // status: 'Activo'
    // }, {
    // rolename: 'localización',
    // observation: 'Acceso a la gestión de localizaciones',
    // status: 'Activo'
    // }, {
    // rolename: 'cliente_propiedad',
    // observation: 'Acceso a la gestión de las propiedades de los clientes',
    // status: 'Activo'
    // }, {
    // rolename: 'producto',
    // observation: 'Acceso a la gestión de productos',
    // status: 'Activo'
    // }, {
    // rolename: 'precio',
    // observation: 'Acceso a la gestión de los precios de los productos',
    // status: 'Activo'
    // }], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('adm_modules', null, {})
  }
}
