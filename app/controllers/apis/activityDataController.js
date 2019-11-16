'use strict'

const express = require('express')

const ActivityDataService = require('../../services/activityDataService')

const router = express.Router()

// create a new ActivityData
router.post('/', (req, res) => {
  const { activityId, customerId, userId, productId, productQuentity, measurementUnitId, createdBy, createdAt, updatedBy, updatedAt } = req.body
  ActivityDataService.createActivityData({ activityId, customerId, userId, productId, productQuentity, measurementUnitId, createdBy, createdAt, updatedBy, updatedAt })
    .then(activityData => res.status(201).send(activityData))
    .catch(error => res.status(400).send(error))
})

// get all ActivityData.
router.get('/', (req, res) => {
  ActivityDataService.getAllActivityDatas()
    .then(activityData => res.status(201).send(activityData))
    .catch(error => res.status(400).send(error))
})

// get ActivityData by id
router.get('/:id', (req, res) => {
  ActivityDataService.getActivityDataById(req.params.id)
    .then(activityData => res.status(200).send(activityData))
    .catch(error => res.status(400).send(error))
})

// update ActivityData by id
router.put('/:id', (req, res) => {
  const { activityId, customerId, userId, productId, productQuentity, measurementUnitId, createdBy, createdAt, updatedBy, updatedAt } = req.body
  ActivityDataService.updateActivityDataById({ activityId, customerId, userId, productId, productQuentity, measurementUnitId, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(activityData => res.status(200).send(activityData))
    .catch(error => res.status(400).send(error))
})

// delete ActivityData by id
router.delete('/:id', (req, res) => {
  ActivityDataService.deleteActivityDataById(req.params.id)
    .then(activityData => res.status(200).send(activityData))
    .catch(error => res.status(400).send(error))
})

module.exports = router
