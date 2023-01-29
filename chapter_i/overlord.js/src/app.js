const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const { QueryTypes } = require('sequelize')
const db = require('./models')

dotenv.config({ path: path.join(__dirname, '/config/config.env') })

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.get('/', (req, res) => {
  res.status(200).json({
    application: { name: 'overlord.js' }
  })
})

app.get('/overlord/rest/v1/version', async (req, res) => {
  const result = await db.sequelize
    .query('SELECT version() as version_database', {
      type: QueryTypes.SELECT
    })
  const version = {
    versionDatabase: result[0].version_database.substring(0, 15),
    versionNode: process.version
  }

  res.json(version)
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
})

module.exports = app
