// Handle for example: not valid json body
const errorHandler = (error, req, res, next) => {
  console.log(error.message)
  res.status(404).json({
    message: error.message
  })
}

module.exports = errorHandler
