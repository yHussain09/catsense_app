'use strict'

const express = require('express')

const ActivityStatusService = require('../../services/ActivityStatusService')

const router = express.Router()

// create a new ActivityStatus
router.post('/', (req, res) => {
  const { name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  ActivityStatusService.createActivityStatus({ name, description, createdBy, createdAt, updatedBy, updatedAt })
    .then(activityStatus => res.status(201).send(activityStatus))
    .catch(error => res.status(400).send(error))
})

// get all ActivityStatus.
router.get('/', (req, res) => {
  ActivityStatusService.getAllActivityStatus(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
    .then(activityStatus => res.status(201).send(activityStatus))
    .catch(error => res.status(400).send(error))
})

// get all areas {activityStatusId, name} for data combo.
router.get('/dataCombo', (req, res) => {
  ActivityStatusService.getActivityStatusDataCombo()
    .then(activityStatus => res.status(200).send(activityStatus))
    .catch(error => res.status(400).send(error))
})

// get ActivityStatus by id
router.get('/:id', (req, res) => {
  ActivityStatusService.getActivityStatusById(req.params.id)
    .then(activityStatus => res.status(200).send(activityStatus))
    .catch(error => res.status(400).send(error))
})

// update ActivityStatus by id
router.put('/:id', (req, res) => {
  const { name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  ActivityStatusService.updateActivityStatusById({ name, description, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(activityStatus => res.status(200).send(activityStatus))
    .catch(error => res.status(400).send(error))
})

// delete ActivityStatus by id
router.delete('/:id', (req, res) => {
  ActivityStatusService.deleteActivityStatusById(req.params.id)
    .then(activityStatus => res.status(200).send(activityStatus))
    .catch(error => res.status(400).send(error))
})

module.exports = router
