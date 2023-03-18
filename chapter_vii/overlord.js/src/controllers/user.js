/** @module controllers/user */
const { validationResult } = require('express-validator')

const userService = require('../services/user')
const passwordUtil = require('../utils/password')
const { errorMessage } = require('../utils/error-message')
/**
 * @name Get user
 * @path {GET} /overlord/v1/user/:id
*/
exports.getUser = async (req, res) => {
  // #swagger.tags = ['User']
  // Catch the validation result
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json(
      errorMessage(errors, req)
    )
  }

  const user = await userService.getUser(req.params.id)

  if (!user) {
    const message = 'User don\'t exist'
    return res.status(404).json(
      errorMessage(message, req)
    )
  }

  res.status(200).json({
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
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json(
        errorMessage(errors, req)
      )
    }

    const { username, email, password } = req.body

    const isUserExist = await isUsernameOrEmailRegister(username, email)

    if (isUserExist.exist) {
      return res.status(404).json(
        errorMessage(isUserExist.message, req)
      )
    }

    // Conditional operator or ternary operator
    // condition ? exprIfTrue : exprIfFalse
    const passwordToSave = (typeof password !== 'undefined' &&
    password !== null)
      ? password
      : passwordUtil.generate()

    const user = await userService.createUser(
      { username, email, password: passwordToSave }
    )

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      status: user.status
    })
  } catch (error) {
    return res.status(503).json(
      errorMessage(error, req)
    )
  }
}

/**
 * @name Update user
 * @path {PUT} /overlord/v1/user/:id
*/
exports.updateUser = async (req, res) => {
  // #swagger.tags = ['User']
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json(
        errorMessage(errors, req)
      )
    }

    const user = await userService.getUser(req.params.id)

    if (!user) {
      return res.status(404).json(
        errorMessage('User don\'t exist', req)
      )
    }

    const { username, email, password, status } = req.body

    const isUserExist = await isUsernameOrEmailRegister(username, email)

    if (isUserExist.exist) {
      return res.status(404).json(
        errorMessage(isUserExist.message, req)
      )
    }

    const userUpdated = await userService.updateUser(
      user,
      { username, email, password, status }
    )

    res.status(200).json({
      id: userUpdated.id,
      username: userUpdated.username,
      email: userUpdated.email,
      createdAt: userUpdated.createdAt,
      status: userUpdated.status
    })
  } catch (error) {
    return res.status(503).json(
      errorMessage(error, req)
    )
  }
}

/**
 * @name Delete user
 * @path {DELETE} /overlord/v1/user/:id
*/
exports.deleteUser = async (req, res) => {
  // #swagger.tags = ['User']
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json(
      errorMessage(errors, req)
    )
  }

  const user = await userService.getUser(req.params.id)

  if (!user) {
    const message = 'User don\'t exist'
    return res.status(404).json(
      errorMessage(message, req)
    )
  }

  await userService.deleteUser(user)

  return res.status(200).json({
    id: user.id,
    description: user.username
  })
}

async function isUsernameOrEmailRegister (username, email) {
  let userExist = await userService.getUserByUsername(username)

  if (userExist) {
    return {
      exist: true,
      message: `The username ${username} already exist`
    }
  }

  userExist = await userService.getUserByEmail(email)

  if (userExist) {
    return {
      exist: true,
      message: `The email ${email} already exist`
    }
  }

  return { exist: false, message: '' }
}
