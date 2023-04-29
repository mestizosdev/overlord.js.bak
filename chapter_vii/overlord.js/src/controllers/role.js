/** @module controllers/role */
const { validationResult } = require('express-validator')

const db = require('../models')
const { errorMessage } = require('../utils/error-message')

// @desc    Get a role
// @route   GET /overlord/rest/v1/role/:id
exports.getRole = async (req, res) => {
  // Catch the validation of last route
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json(
      errorMessage(errors, req)
    )
  }
  // Find if the rol exists
  const role = await db.Role.findOne({
    where: { id: req.params.id }
  })

  if (!role) {
    const message = 'Role don\'t exist'
    return res.status(404).json(
      errorMessage(message, req)
    )
  }

  return res.status(200).json({
    id: role.id,
    rolename: role.rolename,
    observation: role.observation,
    status: role.status
  })
}

// @desc    Create a role
// @route   POST /overlord/rest/v1/role
exports.createRole = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json(
      errorMessage(errors, req)
    )
  }

  const { rolename, observation, status } = req.body

  // Search if role existe
  const role = await db.Role.findOne({
    where: { rolename }
  })
  // If role exist, send message
  if (role) {
    return res.status(422).json({
      message: 'El rol ya existe'
    })
  }

  const roleNew = db.Role.build({
    rolename: rolename.toLowerCase(),
    observation,
    status
  })

  await roleNew.save()
    .then(() => res.status(200).json({
      id: roleNew.id,
      rolename: roleNew.rolename,
      observation: roleNew.observation,
      status: roleNew.status
    }))
}

// @desc    Update a role
// @route   PUT /overlord/rest/v1/role/:id
exports.updateRole = async (req, res) => {
  const errors = validationResult(req)

  if (!errors.isEmpty()) {
    return res.status(422).json(
      errorMessage(errorMessage, req)
    )
  }

  // Find if the rol exists
  const role = await db.Role.findOne({
    where: { id: req.params.id }
  })

  if (!role) {
    return res.status(404).json({
      message: 'No existe el rol'
    })
  }

  const { observation, status } = req.body

  await role.update({
    observation,
    status
  })
    .then(() => res.status(200).json({
      id: role.id,
      rolename: role.rolename,
      observation: role.observation,
      status: role.status
    }))
}

// @desc    Delete a role
// @route   DELETE /overlord/rest/v1/role/:id
exports.deleteRole = async (req, res) => {
  // Catch thevalidation of last route
  const errors = validationResult(req)
  // If errors existed, response message with status 422
  if (!errors.isEmpty()) {
    return res.status(422).json(
      errorMessage(errorMessage, req)
    )
  }

  const id = req.params.id
  // Find if the rol exists
  const role = await db.Role.findOne({
    where: { id }
  })

  if (!role) {
    return res.status(404).json({
      message: 'No existe el rol'
    })
  }
  try {
    await role.destroy()
      .then(() => res.status(200).json({
        id: role.id,
        description: role.rolename
      }))
  } catch (error) {
    return res.status(501).json({
      message: error
    })
  }
}
