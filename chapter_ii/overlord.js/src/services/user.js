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
  /*
  // Classic mode
  let passwordToSave

  if (!password) {
    passwordToSave = passwordUtil.generate()
    console.log(passwordToSave)
  } else {
    passwordToSave = password
  }
  */

  // Conditional operator or ternary operator
  // condition ? exprIfTrue : exprIfFalse
  const passwordToSave = (typeof password !== 'undefined' &&
    password !== null)
    ? password
    : passwordUtil.generate()

  console.log(`passwordToSave: ${passwordToSave}`)

  const userNew = db.User.build({
    username,
    email: email.toLowerCase(),
    password: await passwordUtil.encrypt(passwordToSave),
    status: true
  })

  await userNew.save()

  return userNew
}

exports.updateUser = async (userToUpdate, userWithNewData) => {
  console.log(`userToUpdate: ${userToUpdate}`)
  console.log(`userWithNewData: ${userWithNewData}`)

  return await userToUpdate.update({
    username: userWithNewData.username,
    email: userWithNewData.email,
    password: userWithNewData.password,
    status: userWithNewData.status
  })
}
