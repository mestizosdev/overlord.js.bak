const express = require('express')
const { getUser, createUser, updateUser } = require('../controllers/user')
const router = express.Router()

router.get('/overlord/v1/user/:id', getUser)
router.post('/overlord/v1/user', createUser)
router.put('/overlord/v1/user/:id', updateUser)

module.exports = router
