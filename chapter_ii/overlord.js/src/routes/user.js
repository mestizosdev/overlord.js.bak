const express = require('express')
const { getUser } = require('../controllers/user')
const router = express.Router()

router.get('/overlord/rest/v1/user/:id', getUser)

module.exports = router
