const db = require('../models')
const passwordUtil = require('../utils/password')

exports.getUser = async (userId) => {
  const user = await db.User.findOne({
    where: { id: userId }
  })

  if (user) {
    return user
  }
}

exports.getUserByUsername = async (username) => {
  const user = await db.User.findOne({
    where: { username }
  })

  if (user) {
    return user
  }
}

exports.createUser = async (userNew) => {
  const user = db.User.build({
    username: userNew.username,
    email: userNew.email.toLowerCase(),
    password: await passwordUtil.encrypt(userNew.password),
    status: true
  })

  return await user.save()
}

exports.updateUser = async (userToUpdate, userWithNewData) => {
  console.log(`userToUpdate: ${userToUpdate}`)
  console.log(`userWithNewData: ${userWithNewData}`)

  return await userToUpdate.update({
    username: userWithNewData.username,
    email: userWithNewData.email,
    password: await passwordUtil.encrypt(userWithNewData.password),
    status: userWithNewData.status
  })
}

exports.deleteUser = async (userToDelete) => {
  await userToDelete.destroy()
}
