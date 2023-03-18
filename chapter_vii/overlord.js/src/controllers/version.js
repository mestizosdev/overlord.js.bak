/** @module controllers/version */
const versionService = require('../services/version')

/**
 * Get name application, database version and node version
 * @name Get application version
 * @path {GET} /overlord/v1/version
*/
exports.getVersion = async (req, res) => {
  // #swagger.description = 'Get version of database and node.js'
  // #swagger.tags = ['Version']
  const version = await versionService.getVersion()

  res.json({
    application: {
      name: 'overlord.js',
      versionDatabase: version.version_database,
      versionNode: process.version
    }
  })
}
