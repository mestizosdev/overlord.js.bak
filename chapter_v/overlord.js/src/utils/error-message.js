/** @module util/error-message */
const logger = require('./logger')

/**
 * Get error
 *
 * @async
 * @param {object|string} error - Error from throw or custom error
 * @param {request} req - http request
 * @returns {Error} error
*/
module.exports.errorMessage = (error, req = null) => {
  console.log(error)

  if (typeof error === 'string') {
    const errors = [{
      location: '',
      message: error,
      param: '',
      value: ''
    }]

    console.log(`${req.method} ${req.url} ${error}`)
    logger.error(`${req.method} ${req.url} ${error}`)

    return { errors }
  } else if (typeof error === 'object') {
    // for validationResult object
    if (typeof error.errors === 'object') {
      const errors = error.errors.map(result => {
        const element = {}

        if (result.msg) {
          element.message = result.msg
        }
        if (result.location) {
          element.location = result.location
        }
        if (result.param) {
          element.param = result.param
        }
        if (result.value) {
          element.value = result.value
        }

        console.log(`${req.method} ${req.url} ${element.message}`)
        logger.error(`${req.method} ${req.url}. 
          Message: ${element.message}, 
          location: ${element.location}, 
          param: ${element.param}, 
          value: ${element.value}`)

        return element
      })

      return { errors }
    } else if (typeof error.errorDatabase === 'object') {
      const errors = error.errorDatabase.map(result => {
        const element = {}

        if (result.message) {
          element.message = result.message
        }
        if (result.path) {
          element.location = result.path
        }
        if (result.type) {
          element.param = result.type
        }
        if (result.value) {
          element.value = result.value
        }

        console.log(`${req.method} ${req.url} ${element.message}`)
        logger.error(`${req.method} ${req.url}. 
          Message: ${element.message}, 
          location: ${element.location}, 
          param: ${element.param}, 
          value: ${element.value}`)

        return element
      })

      return { errors }
    } else if (typeof error.middlewareError === 'object') {
      const errors = []
      const element = {}

      if (error.message) {
        element.message = error.message
      }

      element.location = ''

      if (error.middlewareError.type) {
        element.param = error.middlewareError.type
      }
      if (error.middlewareError.body) {
        element.value = error.middlewareError.body
      }

      errors.push(element)

      console.log(`${req.method} ${req.url} ${element.message}`)
      logger.error(`${req.method} ${req.url}. 
        Message: ${element.message}, 
        location: ${element.location}, 
        param: ${element.param}, 
        value: ${element.value}`)

      return { errors }
    }
  }

  console.log(`${req.method} ${req.url} ${error.message}`)
  logger.error(`${req.method} ${req.url} ${error.message}`)

  return error
}
