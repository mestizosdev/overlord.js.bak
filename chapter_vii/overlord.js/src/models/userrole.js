'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate (models) {
      UserRole.belongsTo(models.User, {
        targetKey: 'id',
        foreignKey: 'userId',
        as: 'user'
      })
      UserRole.belongsTo(models.Role, {
        targetKey: 'roleName',
        foreignKey: 'roleName',
        as: 'role'
      })
    }
  }

  UserRole.init({
    roleName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserRole',
    underscored: true,
    timestamps: false,
    tableName: 'adm_user_roles'
  })
  return UserRole
}
