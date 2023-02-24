/** @module services/user */
const db = require('../models')
const passwordUtil = require('../utils/password')

/**
 * Get user
 *
 * @async
 * @param {number} userId - User identification
 * @returns {User} user
*/
exports.getUser = async (userId) => {
  const user = await db.User.findOne({
    where: { id: userId }
  })

  if (user) {
    return user
  }
}

/**
 * Get user by username
 *
 * @async
 * @param {string} username - Username
 * @returns {User} user
*/
exports.getUserByUsername = async (username) => {
  const user = await db.User.findOne({
    where: { username }
  })

  if (user) {
    return user
  }
}

/**
 * Create user
 *
 * @async
 * @param {User} userNew - User to create
 * @returns {User} user
*/
exports.createUser = async (userNew) => {
  const user = db.User.build({
    username: userNew.username,
    email: userNew.email.toLowerCase(),
    password: await passwordUtil.encrypt(userNew.password),
    status: true
  })

  return await user.save()
}

/**
 * Update user
 *
 * @async
 * @param {User} userToUpdate - Current user to update
 * @param {User} userWithNewData - User with new data
 * @returns {User}
*/
exports.updateUser = async (userToUpdate, userWithNewData) => {
  return await userToUpdate.update({
    username: userWithNewData.username,
    email: userWithNewData.email,
    password: await passwordUtil.encrypt(userWithNewData.password),
    status: userWithNewData.status
  })
}

/**
 * Delete user
 *
 * @async
 * @param {User} userToDelete - Current user to delete
*/
exports.deleteUser = async (userToDelete) => {
  await userToDelete.destroy()
}
