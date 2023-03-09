const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' })

const doc = {
  info: {
    version: '1.0.0',
    title: 'Overlord.js'
  },
  host: 'localhost:5000'
}

const outputFile = '../swagger.json'
const endpointsFiles = ['src/routes/version.js', 'src/routes/user.js']

swaggerAutogen(outputFile, endpointsFiles, doc)
