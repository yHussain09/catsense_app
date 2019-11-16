'use strict'

const express = require('express')

const RoleService = require('../../services/RoleService')

const router = express.Router()

// create a new Role
router.post('/', (req, res) => {
  const { organizationId, name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  RoleService.createRole({ organizationId, name, description, createdBy, createdAt, updatedBy, updatedAt })
    .then(role => res.status(201).send(role))
    .catch(error => res.status(400).send(error))
})

// get all Roles.
router.get('/', (req, res) => {
    RoleService.getAllRoles(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
    .then(role => res.status(200).send(role))
    .catch(error => res.status(400).send(error))
})

// get all role {roleId, name} for data combo.
router.get('/dataCombo', (req, res) => {
  RoleService.getRolesDataCombo()
    .then(role => res.status(200).send(role))
    .catch(error => res.status(400).send(error))
})

// get Role by id
router.get('/:id', (req, res) => {
    RoleService.getRoleById(req.params.id)
    .then(role => res.status(200).send(role))
    .catch(error => res.status(400).send(error))
})

// update Role by id
router.put('/:id', (req, res) => {
  const { organizationId, name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  RoleService.updateRoleById(
    { organizationId, name, description, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(role => res.status(200).send(role))
    .catch(error => res.status(400).send(error))
})

// delete Role by id
router.delete('/:id', (req, res) => {
    RoleService.deleteRoleById(req.params.id)
    .then(role => res.status(200).send(role))
    .catch(error => res.status(400).send(error))
})

module.exports = router
