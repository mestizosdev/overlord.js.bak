const db = require('../models')
const { QueryTypes } = require('sequelize')

// @desc    Get database version and node version
// @route   GET /overlord/rest/v1/version
exports.getVersion = async (req, res) => {
  const result = await db.sequelize
    .query('SELECT version() as version_database', {
      type: QueryTypes.SELECT
    })

  res.json({
    versionDatabase: result[0].version_database,
    versionNode: process.version
  })
}
