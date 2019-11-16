'use strict'

const express = require('express')
const userService = require('../../services/userService')

const router = express.Router()

// create a new user
router.post('/', (req, res) => {
  const { organizationId, roleId, username, password, active, createdBy, createdAt, updatedBy, updatedAt } = req.body
  userService.createUser({ organizationId, roleId, username, password, active, createdBy, createdAt, updatedBy, updatedAt })
    .then(user => res.status(201).send(user))
    .catch(error => res.status(400).send(error))
})

// get all users
router.get('/', (req, res) => {
  userService.getAllUsers(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error))
})

// get all Roles without pagination.
// router.get('/all', (req, res) => {
//   UserService.getAllUsersWithoutPage()
//   .then(user => res.status(200).send(user))
//   .catch(error => res.status(400).send(error))
// })

// get all users {userId, username} for data combo.
router.get('/dataCombo', (req, res) => {
  userService.getUserDataCombo()
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error))
})

// get user by id
router.get('/:id', (req, res) => {
  userService.getUserById(req.params.id)
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error))
})

// update user by id
router.put('/:id', (req, res) => {
  const { organizationId, roleId, username, password, active, createdBy, createdAt, updatedBy, updatedAt } = req.body
  userService.updateUserById({ organizationId, roleId, username, password, active, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error))
})

// delete user by id
router.delete('/:id', (req, res) => {
  userService.deleteUserById(res.params.id)
    .then(user => res.status(200).send(user))
    .catch(error => res.status(400).send(error))
})

module.exports = router
