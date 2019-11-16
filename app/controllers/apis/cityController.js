'use strict'

const express = require('express')

const CityService = require('../../services/CityService')

const router = express.Router()

// create a new City
router.post('/', (req, res) => {
  const { countryId, name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  CityService.createCity({ countryId, name, description, createdBy, createdAt, updatedBy, updatedAt })
    .then(city => res.status(201).send(city))
    .catch(error => res.status(400).send(error))
})

// get all City.
router.get('/', (req, res) => {
  CityService.getAllCitys(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
    .then(city => res.status(200).send(city))
    .catch(error => res.status(400).send(error))
})

// get all cities {cityId, name} for data combo.
router.get('/dataCombo', (req, res) => {
  CityService.getCitysDataCombo()
    .then(city => res.status(200).send(city))
    .catch(error => res.status(400).send(error))
})

// get City by id
router.get('/:id', (req, res) => {
  CityService.getCityById(req.params.id)
    .then(city => res.status(200).send(city))
    .catch(error => res.status(400).send(error))
})

// update City by id
router.put('/:id', (req, res) => {
  const { countryId, name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  CityService.updateCityById({ countryId, name, description, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(city => res.status(200).send(city))
    .catch(error => res.status(400).send(error))
})

// delete City by id
router.delete('/:id', (req, res) => {
  CityService.deleteCityById(req.params.id)
    .then(city => res.status(200).send(city))
    .catch(error => res.status(400).send(error))
})

module.exports = router
