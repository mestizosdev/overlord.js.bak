'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate (models) {
      Role.hasMany(models.UserRole, {
        sourceKey: 'role',
        foreignKey: 'role',
        as: 'userrole'
      })
      Role.hasMany(models.Module, {
        sourceKey: 'role',
        foreignKey: 'role',
        as: 'module'
      })
    }
  }
  Role.init({
    role: DataTypes.STRING,
    observation: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Role',
    underscored: true,
    tableName: 'adm_roles',
    timestamps: false
  })
  return Role
}
