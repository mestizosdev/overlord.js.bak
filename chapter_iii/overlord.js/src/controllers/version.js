const versionService = require('../services/version')

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
