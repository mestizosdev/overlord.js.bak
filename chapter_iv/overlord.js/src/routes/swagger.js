const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('../../swagger.json')

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


const swaggerDocs = (app, port) => {
  app.use('/overlord/v1/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, swaggerSpec))
  app.get('/overlord/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

module.exports = { swaggerDocs }
