'use strict'

const express = require('express')

const measurementUnitService = require('../../services/MeasurementUnitService')

const router = express.Router()

// create a new MeasurementUnit
router.post('/', (req, res) => {
  const { name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  measurementUnitService.createMeasurementUnit({ name, description, createdBy, createdAt, updatedBy, updatedAt })
    .then(measurementUnit => res.status(201).send(measurementUnit))
    .catch(error => res.status(400).send(error))
})

// get all MeasurementUnits.
router.get('/', (req, res) => {
    measurementUnitService.getAllMeasurementUnits(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
        .then(measurementUnit => res.status(200).send(measurementUnit))
        .catch(error => res.status(400).send(error))
})

// get all MeasurementUnits {measurementUnitsId, name} for data combo.
router.get('/dataCombo', (req, res) => {
  measurementUnitService.getMeasurementUnitsDataCombo()
    .then(measurementUnit => res.status(200).send(measurementUnit))
    .catch(error => res.status(400).send(error))
})

// get MeasurementUnit by id
router.get('/:id', (req, res) => {
    measurementUnitService.getMeasurementUnitById(req.params.id)
    .then(MeasurementUnit => res.status(200).send(MeasurementUnit))
    .catch(error => res.status(400).send(error))
})

// update MeasurementUnit by id
router.put('/:id', (req, res) => {
  const { name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  measurementUnitService.updateMeasurementUnitById(
    { name, description, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(MeasurementUnit => res.status(200).send(MeasurementUnit))
    .catch(error => res.status(400).send(error))
})

// delete MeasurementUnit by id
router.delete('/:id', (req, res) => {
    measurementUnitService.deleteMeasurementUnitById(req.params.id)
    .then(MeasurementUnit => res.status(200).send(MeasurementUnit))
    .catch(error => res.status(400).send(error))
})

module.exports = router
