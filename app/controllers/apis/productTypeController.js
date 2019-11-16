'use strict'

const express = require('express')

const productTypeService = require('../../services/productTypeService')

const router = express.Router()

// create a new productType
router.post('/', (req, res) => {
  const { organizationId, name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  productTypeService.createProductType({ organizationId, name, description, createdBy, createdAt, updatedBy, updatedAt })
    .then(productType => res.status(201).send(productType))
    .catch(error => res.status(400).send(error))
})

// get all productTypes.
router.get('/', (req, res) => {
    productTypeService.getAllProductTypes(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
    .then(productType => res.status(200).send(productType))
    .catch(error => res.status(400).send(error))
})

// get all ProductTypes {productTypesId, name} for data combo.
router.get('/dataCombo', (req, res) => {
  productTypeService.getProductTypesDataCombo()
    .then(productTypes => res.status(200).send(productTypes))
    .catch(error => res.status(400).send(error))
})

// get productType by id
router.get('/:id', (req, res) => {
    productTypeService.getProductTypeById(req.params.id)
    .then(productType => res.status(200).send(productType))
    .catch(error => res.status(400).send(error))
})

// update productType by id
router.put('/:id', (req, res) => {
  const { organizationId, name, description, createdBy, createdAt, updatedBy, updatedAt } = req.body
  productTypeService.updateProductTypeById(
    { organizationId, name, description, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(productType => res.status(200).send(productType))
    .catch(error => res.status(400).send(error))
})

// delete productType by id
router.delete('/:id', (req, res) => {
    productTypeService.deleteProductTypeById(req.params.id)
    .then(productType => res.status(200).send(productType))
    .catch(error => res.status(400).send(error))
})

module.exports = router
