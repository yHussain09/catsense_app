'use strict'

const express = require('express')

const AreaService = require('../../services/AreaService')

const router = express.Router()

// create a new Area
router.post('/', (req, res) => {
  const { countryId, cityId, name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  AreaService.createArea({ countryId, cityId, name, description, createdBy, createdAt, updatedBy, updatedAt })
    .then(area => res.status(201).send(area))
    .catch(error => res.status(400).send(error))
})

// get all Area.
router.get('/', (req, res) => {
  AreaService.getAllAreas(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
    .then(area => res.status(200).send(area))
    .catch(error => res.status(400).send(error))
})

// get all areas {areaId, name} for data combo.
router.get('/dataCombo', (req, res) => {
  AreaService.getAreasDataCombo()
    .then(area => res.status(200).send(area))
    .catch(error => res.status(400).send(error))
})

// get Area by id
router.get('/:id', (req, res) => {
  AreaService.getAreaById(req.params.id)
    .then(area => res.status(200).send(area))
    .catch(error => res.status(400).send(error))
})

// update Area by id
router.put('/:id', (req, res) => {
  const { countryId, cityId, name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  AreaService.updateAreaById({ countryId, cityId, name, description, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(area => res.status(200).send(area))
    .catch(error => res.status(400).send(error))
})

// delete Area by id
router.delete('/:id', (req, res) => {
  AreaService.deleteAreaById(req.params.id)
    .then(area => res.status(200).send(area))
    .catch(error => res.status(400).send(error))
})

module.exports = router
