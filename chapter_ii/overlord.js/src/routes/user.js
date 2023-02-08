const express = require('express')
const { getUser, createUser, updateUser, deleteUser } = require('../controllers/user')
const router = express.Router()

router.get('/overlord/v1/user/:id', getUser)
router.post('/overlord/v1/user', createUser)
router.put('/overlord/v1/user/:id', updateUser)
router.delete('/overlord/v1/user/:id', deleteUser)

module.exports = router
