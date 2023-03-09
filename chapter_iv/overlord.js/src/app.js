const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')

const routes = require('./routes')
const { swaggerDocs: v1SwaggerDocs } = require('./routes/swagger')

dotenv.config({ path: path.join(__dirname, '/config/config.env') })

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json()) // body parser
app.use(routes.version)
app.use(routes.user)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
  v1SwaggerDocs(app, PORT)
})

module.exports = app
