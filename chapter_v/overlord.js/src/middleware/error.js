/** @module middleware/error */
const logger = require('../utils/logger')

/**
 * Handle errors, for example: not valid json body
 *
 * @name Error
 * @path {GET}
 * @response {Object} metadata: JSON with error message
*/
const errorHandler = (error, req, res, next) => {
  console.log(`${req.method} ${req.url} ${error.message}`)
  logger.error(`${req.method} ${req.url} ${error.message}`)

  res.status(404).json({
    message: error.message
  })
}

module.exports = errorHandler
