/** @module middleware/error */
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
    return res.status(400).json(
      errorMessage(middleware, req)
    )
  }

  res.status(501).json(
    errorMessage(String(error.message), req)
  )
}

module.exports = errorHandler
