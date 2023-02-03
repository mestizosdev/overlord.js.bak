const bcrypt = require('bcrypt')

const minCharacters = 10

module.exports.encrypt = (password) => {
  const salt = bcrypt.genSaltSync(minCharacters)
  const encryptedPassword = bcrypt.hash(password, salt)

  return encryptedPassword
}
