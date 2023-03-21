/** @module models/user */
'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  /**
   * @class
   * @property {id} number
   * @property {username} string
   * @property {password} string
   * @property {email} string
   * @property {status} boolean
 */
  class User extends Model {
    static associate (models) {
      User.hasMany(models.UserRole, {
        sourceKey: 'id',
        foreignKey: 'userId',
        as: 'userroles'
      })
    }
  }
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    underscored: true,
    tableName: 'adm_users'
  })
  return User
}
