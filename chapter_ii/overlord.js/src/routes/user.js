const express = require('express')
const { getUser, createUser } = require('../controllers/user')
const router = express.Router()

router.get('/overlord/v1/user/:id', getUser)
router.post('/overlord/v1/user', createUser)

module.exports = router
