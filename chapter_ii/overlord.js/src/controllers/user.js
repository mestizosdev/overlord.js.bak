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
    email: user.observation,
    createdAt: user.createdAt,
    status: user.status
  })
}
