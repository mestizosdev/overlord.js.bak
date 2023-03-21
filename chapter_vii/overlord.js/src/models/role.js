'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate (models) {
      Role.hasMany(models.UserRole, {
        sourceKey: 'roleName',
        foreignKey: 'roleName',
        as: 'roleusers'
      })
    }
  }
  Role.init({
    roleName: DataTypes.STRING,
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
