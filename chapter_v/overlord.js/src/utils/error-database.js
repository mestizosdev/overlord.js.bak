class ErrorDatabase extends Error {
  constructor (message, errorDatabase) {
    super(message)
    this.errorDatabase = errorDatabase
  }
}

module.exports = ErrorDatabase
