'use strict'

const express = require('express')

const StoreService = require('../../services/StoreService')

const router = express.Router()

// create a new Store
router.post('/', (req, res) => {
  const { countryId, cityId, areaId, name, description, active, createdBy, createdAt, updatedBy, updatedAt } = req.body
  StoreService.createStore({ countryId, cityId, areaId, name, description, active, createdBy, createdAt, updatedBy, updatedAt })
    .then(store => res.status(201).send(store))
    .catch(error => res.status(400).send(error))
})

// get all Store.
router.get('/', (req, res) => {
  StoreService.getAllStores(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
    .then(store => res.status(200).send(store))
    .catch(error => res.status(400).send(error))
})

// get all stores {storeId, name} for data combo.
router.get('/dataCombo', (req, res) => {
  StoreService.getStoresDataCombo()
    .then(store => res.status(200).send(store))
    .catch(error => res.status(400).send(error))
})

// get Store by id
router.get('/:id', (req, res) => {
  StoreService.getStoreById(req.params.id)
    .then(store => res.status(200).send(store))
    .catch(error => res.status(400).send(error))
})

// update Store by id
router.put('/:id', (req, res) => {
  const { countryId, cityId, areaId, name, description, active, createdBy, createdAt, updatedBy, updatedAt } = req.body
  StoreService.updateStoreById({ countryId, cityId, areaId, name, description, active, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(store => res.status(200).send(store))
    .catch(error => res.status(400).send(error))
})

// delete Store by id
router.delete('/:id', (req, res) => {
  StoreService.deleteStoreById(req.params.id)
    .then(store => res.status(200).send(store))
    .catch(error => res.status(400).send(error))
})

module.exports = router
