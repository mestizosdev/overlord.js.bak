const { Router } = require('express')
const router = Router()
const { getVersion } = require('../controllers/version')

router.get('/overlord/rest/v1/version', getVersion)

module.exports = router
