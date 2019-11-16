'use strict'

const express = require('express')

const ActivityUserService = require('../../services/activityUserService')

const router = express.Router()

// create a new ActivityUser
router.post('/', (req, res) => {
  const { activityId, userId, createdBy, createdAt, updatedBy, updatedAt } = req.body
  ActivityUserService.createActivityUser({ activityId, userId, createdBy, createdAt, updatedBy, updatedAt })
    .then(activityUser => res.status(201).send(activityUser))
    .catch(error => res.status(400).send(error))
})

// get all ActivityUser.
router.get('/', (req, res) => {
  ActivityUserService.getAllActivityUsers()
    .then(activityUser => res.status(201).send(activityUser))
    .catch(error => res.status(400).send(error))
})

// get ActivityUser by id
router.get('/:id', (req, res) => {
  ActivityUserService.getActivityUserById(req.params.id)
    .then(activityUser => res.status(200).send(activityUser))
    .catch(error => res.status(400).send(error))
})

// update ActivityUser by id
router.put('/:id', (req, res) => {
  const { activityId, userId, createdBy, createdAt, updatedBy, updatedAt } = req.body
  ActivityUserService.updateActivityUserById({ activityId, userId, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(activityUser => res.status(200).send(activityUser))
    .catch(error => res.status(400).send(error))
})

// delete ActivityUser by id
router.delete('/:id', (req, res) => {
  ActivityUserService.deleteActivityUserById(req.params.id)
    .then(activityUser => res.status(200).send(activityUser))
    .catch(error => res.status(400).send(error))
})

module.exports = router
