/** @module services/version */
const db = require('../models')
const { QueryTypes } = require('sequelize')

/**
 * Get database version from query raw
 *
 * @async
*/
exports.getVersion = async () => {
  const version = await db.sequelize
    .query('SELECT version() as version_database', {
      type: QueryTypes.SELECT
    })

  if (version) {
    if (version.length > 0) { return version[0] }
  }
}
