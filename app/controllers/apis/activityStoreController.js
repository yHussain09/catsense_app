'use strict'

const express = require('express')

const ActivityStoreService = require('../../services/activityStoreService')

const router = express.Router()

// create a new ActivityStore
router.post('/', (req, res) => {
  const { activityId, storeId, createdBy, createdAt, updatedBy, updatedAt } = req.body
  ActivityStoreService.createActivityStore({ activityId, storeId, createdBy, createdAt, updatedBy, updatedAt })
    .then(activityStore => res.status(201).send(activityStore))
    .catch(error => res.status(400).send(error))
})

// get all ActivityStore.
router.get('/', (req, res) => {
  ActivityStoreService.getAllActivityStores(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
    .then(activityStore => res.status(201).send(activityStore))
    .catch(error => res.status(400).send(error))
})

// get ActivityStore by id
router.get('/:id', (req, res) => {
  ActivityStoreService.getActivityStoreById(req.params.id)
    .then(activityStore => res.status(200).send(activityStore))
    .catch(error => res.status(400).send(error))
})

// update ActivityStore by id
router.put('/:id', (req, res) => {
  const { activityId, storeId, createdBy, createdAt, updatedBy, updatedAt } = req.body
  ActivityStoreService.updateActivityStoreById({ activityId, storeId, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(activityStore => res.status(200).send(activityStore))
    .catch(error => res.status(400).send(error))
})

// delete ActivityStore by id
router.delete('/:id', (req, res) => {
  ActivityStoreService.deleteActivityStoreById(req.params.id)
    .then(activityStore => res.status(200).send(activityStore))
    .catch(error => res.status(400).send(error))
})

module.exports = router
