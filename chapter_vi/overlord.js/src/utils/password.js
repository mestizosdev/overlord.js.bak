/** @module utils/password */
const bcrypt = require('bcrypt')
const generator = require('generate-password')

const minCharacters = 10

/**
 * Encrypt password
 * @async
 * @param {string} password
 * @returns {string}
*/
module.exports.encrypt = (password) => {
  const salt = bcrypt.genSaltSync(minCharacters)
  const encryptedPassword = bcrypt.hash(password, salt)

  return encryptedPassword
}

/**
 * Generate password
 *
 * @returns {string}
*/
module.exports.generate = () => {
  const password = generator.generate({
    length: minCharacters,
    numbers: true,
    uppercase: true,
    lowercase: true,
    symbols: true
  })

  return password
}
