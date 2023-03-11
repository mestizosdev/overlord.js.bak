/** @module controllers/user */
const userService = require('../services/user')
const passwordUtil = require('../utils/password')
const { validationResult } = require('express-validator')

/**
 * @name Get user
 * @path {GET} /overlord/v1/user/:id
*/
exports.getUser = async (req, res) => {
  // #swagger.tags = ['User']
  // Catch the validation result
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errors
    })
  }

  const user = await userService.getUser(req.params.id)

  if (!user) {
    return res.status(404).json({
      message: 'User don\'t exist'
    })
  }

  return res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    status: user.status
  })
}

/**
 * @name Create user
 * @path {POST} /overlord/v1/user
*/
exports.createUser = async (req, res) => {
  // #swagger.tags = ['User']
  console.log(req.body)
  const { username, email, password } = req.body

  const userExist = await userService.getUserByUsername(username)

  if (userExist) {
    return res.status(404).json({
      message: `User cannot be created, the username ${username} already exist`
    })
  }

  // Conditional operator or ternary operator
  // condition ? exprIfTrue : exprIfFalse
  const passwordToSave = (typeof password !== 'undefined' &&
    password !== null)
    ? password
    : passwordUtil.generate()

  console.log(`passwordToSave: ${passwordToSave}`)

  const user = await userService.createUser({ username, email, password: passwordToSave })

  return res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    status: user.status
  })
}

/**
 * @name Update user
 * @path {PUT} /overlord/v1/user/:id
*/
exports.updateUser = async (req, res) => {
  // #swagger.tags = ['User']

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: errors
    })
  }

  const user = await userService.getUser(req.params.id)

  if (!user) {
    return res.status(404).json({
      message: 'User don\'t exist'
    })
  }

  const { username, email, password, status } = req.body

  const userUpdated = await userService.updateUser(
    user,
    { username, email, password, status }
  )

  return res.status(200).json({
    id: userUpdated.id,
    username: userUpdated.username,
    email: userUpdated.email,
    createdAt: userUpdated.createdAt,
    status: userUpdated.status
  })
}

/**
 * @name Delete user
 * @path {DELETE} /overlord/v1/user/:id
*/
exports.deleteUser = async (req, res) => {
  // #swagger.tags = ['User']
  const user = await userService.getUser(req.params.id)

  if (!user) {
    return res.status(404).json({
      message: 'User don\'t exist'
    })
  }

  await userService.deleteUser(user)

  return res.status(200).json({
    id: user.id,
    description: user.username
  })
}
