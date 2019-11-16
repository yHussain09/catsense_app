'use strict'

const express = require('express')

const organizationService = require('../../services/organizationService')

const router = express.Router()

// create a new organization
router.post('/', (req, res) => {
  const { name, description, active, createdBy, createdAt, updatedBy, updatedAt } = req.body
  organizationService.createOrganization({ name, description, active, createdBy, createdAt, updatedBy, updatedAt })
    .then(organization => res.status(201).send(organization))
    .catch(error => res.status(400).send(error))
})

// get all organization.
router.get('/', (req, res) => {
  organizationService.getAllOrganizations(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
    .then(organization => res.status(200).send(organization))
    .catch(error => res.status(400).send(error))
})

// get all organization {organizationId, name} for data combo.
router.get('/dataCombo', (req, res) => {
  organizationService.getOrganizationsDataCombo()
    .then(organization => res.status(200).send(organization))
    .catch(error => res.status(400).send(error))
})

// get organization by id
router.get('/:id', (req, res) => {
  organizationService.getOrganizationById(req.params.id)
    .then(organization => res.status(200).send(organization))
    .catch(error => res.status(400).send(error))
})

// update organization by id
router.put('/:id', (req, res) => {
  const { name, description, active, createdBy, createdAt, updatedBy, updatedAt } = req.body
  organizationService.updateOrganizationById({ name, description, active, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(organization => res.status(200).send(organization))
    .catch(error => res.status(400).send(error))
})

// delete organization by id
router.delete('/:id', (req, res) => {
  organizationService.deleteOrganizationById(req.params.id)
    .then(organization => res.sendStatus(200).send(organization))
    .catch(error => res.status(400).send(error))
})

module.exports = router
