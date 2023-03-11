const express = require('express')
const router = express.Router()
const { param, body } = require('express-validator')

const { getUser, createUser, updateUser, deleteUser } = require('../controllers/user')

router.get('/overlord/v1/user/:id',
  param('id').toInt().notEmpty()
    .withMessage('Should have a numeric identifier'),
  getUser)

router.post('/overlord/v1/user', createUser)

router.put('/overlord/v1/user/:id',
  param('id').toInt().notEmpty()
    .withMessage('Should have a numeric identifier'),
  body('username')
    .not().isEmpty()
    .withMessage('Should have a username')
    .isLength(2)
    .withMessage('The username should have a more letters')
    .custom(value => !/\s/.test(value))
    .withMessage('The username not should have a blank spaces'),
  body('status').isBoolean(true)
    .withMessage('Should have a true or false in status'),
  body('email').isEmail()
    .withMessage('Should have a valid email'),
  updateUser)

router.delete('/overlord/v1/user/:id', deleteUser)

module.exports = router
