module.exports.errorMessage = (error) => {
  console.log('Error Message')
  console.log(typeof error)
  console.log(error.middlewareError)

  if (typeof error === 'string') {
    const errors = [{
      location: '',
      message: error,
      param: '',
      value: ''
    }]

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
      return { errors }
    }
  }

  return error
}
