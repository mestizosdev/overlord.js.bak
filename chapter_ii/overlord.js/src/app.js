const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const version = require('./routes/version')

dotenv.config({ path: path.join(__dirname, '/config/config.env') })

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(version)

app.get('/', (req, res) => {
  res.status(200).json({
    application: { name: 'overlord.js' }
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
})

module.exports = app
