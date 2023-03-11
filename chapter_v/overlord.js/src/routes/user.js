const express = require('express')
const { getUser, createUser, updateUser, deleteUser } = require('../controllers/user')
const router = express.Router()
const { param, body } = require('express-validator')

router.get('/overlord/v1/user/:id',
  param('id').toInt().notEmpty()
    .withMessage('Should have a numeric identifier'),
  getUser)

router.post('/overlord/v1/user', createUser)

router.put('/overlord/v1/user/:id',
  param('id').toInt().notEmpty()
    .withMessage('Should have a numeric identifier'),
  body('status').isBoolean(true)
    .withMessage('Should have a true or false in status'),
  updateUser)

router.delete('/overlord/v1/user/:id', deleteUser)

module.exports = router
