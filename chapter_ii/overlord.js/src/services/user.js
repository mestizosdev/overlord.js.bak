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

exports.createUser = async (username, email, password) => {
  let passwordToSave

  if (!password) {
    passwordToSave = passwordUtil.generate()
    console.log(passwordToSave)
  } else {
    passwordToSave = password
  }

  const userNew = db.User.build({
    username,
    email: email.toLowerCase(),
    password: await passwordUtil.encrypt(passwordToSave),
    status: true
  })

  await userNew.save()

  return userNew
}
