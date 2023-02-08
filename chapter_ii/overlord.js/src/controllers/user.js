const userService = require('../services/user')

exports.getUser = async (req, res) => {
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

exports.createUser = async (req, res) => {
  console.log(req.body)
  const { username, email, password } = req.body

  const userExist = await userService.getUserByUsername(username)

  if (userExist) {
    return res.status(404).json({
      message: `User cannot be created, the username ${username} already exist`
    })
  }

  const user = await userService.createUser(username, email, password)

  return res.status(200).json({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt,
    status: user.status
  })
}

exports.updateUser = async (req, res) => {
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

exports.deleteUser = async (req, res) => {
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
