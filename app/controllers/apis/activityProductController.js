'use strict'

const express = require('express')

const ActivityProductService = require('../../services/activityProductService')

const router = express.Router()

// create a new ActivityProduct
router.post('/', (req, res) => {
  const { activityId, productId, createdBy, createdAt, updatedBy, updatedAt } = req.body
  ActivityProductService.createActivityProduct({ activityId, productId, createdBy, createdAt, updatedBy, updatedAt })
    .then(activityProduct => res.status(201).send(activityProduct))
    .catch(error => res.status(400).send(error))
})

// get all ActivityProduct.
router.get('/', (req, res) => {
  ActivityProductService.getAllActivityProducts()
    .then(activityProduct => res.status(201).send(activityProduct))
    .catch(error => res.status(400).send(error))
})

// get ActivityProduct by id
router.get('/:id', (req, res) => {
  ActivityProductService.getActivityProductById(req.params.id)
    .then(activityProduct => res.status(200).send(activityProduct))
    .catch(error => res.status(400).send(error))
})

// update ActivityProduct by id
router.put('/:id', (req, res) => {
  const { activityId, productId, createdBy, createdAt, updatedBy, updatedAt } = req.body
  ActivityProductService.updateActivityProductById({ activityId, productId, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(activityProduct => res.status(200).send(activityProduct))
    .catch(error => res.status(400).send(error))
})

// delete ActivityProduct by id
router.delete('/:id', (req, res) => {
  ActivityProductService.deleteActivityProductById(req.params.id)
    .then(activityProduct => res.status(200).send(activityProduct))
    .catch(error => res.status(400).send(error))
})

module.exports = router
