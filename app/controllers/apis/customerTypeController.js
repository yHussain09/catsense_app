'use strict'

const express = require('express')

const CustomerTypeService = require('../../services/customerTypeService')

const router = express.Router()

// create a new CustomerType
router.post('/', (req, res) => {
  const { name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  CustomerTypeService.createCustomerType({ name, description, createdBy, createdAt, updatedBy, updatedAt })
    .then(customerType => res.status(201).send(customerType))
    .catch(error => res.status(400).send(error))
})

// get all CustomerType.
router.get('/', (req, res) => {
  CustomerTypeService.getAllCustomerTypes(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
    .then(customerType => res.status(200).send(customerType))
    .catch(error => res.status(400).send(error))
})

// get all customerTypes {customerTypeId, name} for data combo.
router.get('/dataCombo', (req, res) => {
  CustomerTypeService.getCustomerTypesDataCombo()
    .then(customerType => res.status(200).send(customerType))
    .catch(error => res.status(400).send(error))
})

// get CustomerType by id
router.get('/:id', (req, res) => {
  CustomerTypeService.getCustomerTypeById(req.params.id)
    .then(customerType => res.status(200).send(customerType))
    .catch(error => res.status(400).send(error))
})

// update CustomerType by id
router.put('/:id', (req, res) => {
  const { name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  CustomerTypeService.updateCustomerTypeById({ name, description, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(customerType => res.status(200).send(customerType))
    .catch(error => res.status(400).send(error))
})

// delete CustomerType by id
router.delete('/:id', (req, res) => {
  CustomerTypeService.deleteCustomerTypeById(req.params.id)
    .then(customerType => res.status(200).send(customerType))
    .catch(error => res.status(400).send(error))
})

module.exports = router
