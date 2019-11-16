'use strict'

const express = require('express')

const CountryService = require('../../services/CountryService')

const router = express.Router()

// create a new Country
router.post('/', (req, res) => {
  const { name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  CountryService.createCountry({ name, description, createdBy, createdAt, updatedBy, updatedAt })
    .then(country => res.status(201).send(country))
    .catch(error => res.status(400).send(error))
})

// get all Country.
router.get('/', (req, res) => {
  CountryService.getAllCountrys(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
    .then(country => res.status(200).send(country))
    .catch(error => res.status(400).send(error))
})

// get all countries {countryId, name} for data combo.
router.get('/dataCombo', (req, res) => {
  CountryService.getCountrysDataCombo()
    .then(country => res.status(200).send(country))
    .catch(error => res.status(400).send(error))
})

// get Country by id
router.get('/:id', (req, res) => {
  CountryService.getCountryById(req.params.id)
    .then(country => res.status(200).send(country))
    .catch(error => res.status(400).send(error))
})

// update Country by id
router.put('/:id', (req, res) => {
  const { name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  CountryService.updateCountryById({ name, description, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(country => res.status(200).send(country))
    .catch(error => res.status(400).send(error))
})

// delete Country by id
router.delete('/:id', (req, res) => {
  CountryService.deleteCountryById(req.params.id)
    .then(country => res.status(200).send(country))
    .catch(error => res.status(400).send(error))
})

module.exports = router
