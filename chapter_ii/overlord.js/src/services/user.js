const db = require('../models')

exports.getUser = async (userId) => {
  // Find if the user exists
  const user = await db.User.findOne({
    where: { id: userId }
  })

  if (user) {
    return user
  }
}
