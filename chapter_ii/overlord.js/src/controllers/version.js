const versionService = require('../services/version')

// @desc    Get database version and node version
// @route   GET /overlord/rest/v1/version
exports.getVersion = async (req, res) => {
  const version = await versionService.getVersion()

  res.json({
    application: {
      name: 'overlord.js',
      versionDatabase: version.version_database,
      versionNode: process.version
    }
  })
}
