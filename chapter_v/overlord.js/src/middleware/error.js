/** @module middleware/error */
const logger = require('../utils/logger')
const { errorMessage } = require('../utils/error-message')

/**
 * Handle errors, for example: not valid json body
 *
 * @name Error
 * @path {GET}
 * @response {Object} metadata: JSON with error message
*/
const errorHandler = (error, req, res, next) => {
  console.log('Error Handler')
  const e = { ...error }
  if (Object.keys(e).length !== 0) {
    console.log('Error', e)
    const middleware = {
      middlewareError: e,
      message: error.message
    }
    return res.status(404).json(
      errorMessage(middleware)
    )
  }

  console.log(`${req.method} ${req.url} ${error.message}`)
  logger.error(`${req.method} ${req.url} ${error.message}`)

  res.status(404).json({
    message: error.message
  })
}

module.exports = errorHandler
