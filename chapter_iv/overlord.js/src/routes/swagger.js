const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const swaggerAutogen = require('swagger-autogen')

const options ={
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Overlord.js',
      version: '1.0.0'
    }
  },
  apis: ['src/routes/version.js']
}

const swaggerSpec = swaggerJSDoc(options)
const outputFile = 'swagger-output.json';

//swaggerAutogen(outputFile, options.apis, options)

const swaggerDocs = (app, port) => {
  app.use('/overlord/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
  app.get('swagger-output.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

module.exports = { swaggerDocs }
