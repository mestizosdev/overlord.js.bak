const db = require('../models')
const { QueryTypes } = require('sequelize')

// @desc    Get database version and node version
// @route   GET /overlord/rest/v1/version
exports.getVersion = async () => {
  const version = await db.sequelize
    .query('SELECT version() as version_database', {
      type: QueryTypes.SELECT
    })

  if (version) {
    if (version.length > 0) { return version[0] }
  }
}
