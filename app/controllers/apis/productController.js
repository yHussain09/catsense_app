'use strict'

const express = require('express')

const productService = require('../../services/ProductService')

const router = express.Router()

// create a new Product
router.post('/', (req, res) => {
  const { organizationId, productTypeId, name, description, quentity, measurementUnitId, createdBy, createdAt, updatedBy, updatedAt } = req.body
  productService.createProduct({ organizationId, productTypeId, name, description, quentity, measurementUnitId, createdBy, createdAt, updatedBy, updatedAt })
    .then(product => res.status(201).send(product))
    .catch(error => res.status(400).send(error))
})

// get all Products.
router.get('/', (req, res) => {
    productService.getAllProducts(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
    .then(product => res.status(200).send(product))
    .catch(error => res.status(400).send(error))
})

// get all Products {productsId, name} for data combo.
router.get('/dataCombo', (req, res) => {
  productService.getProductsDataCombo()
    .then(products => res.status(200).send(products))
    .catch(error => res.status(400).send(error))
})

// get Product by id
router.get('/:id', (req, res) => {
    productService.getProductById(req.params.id)
    .then(product => res.status(200).send(product))
    .catch(error => res.status(400).send(error))
})

// update Product by id
router.put('/:id', (req, res) => {
  const { organizationId, productTypeId, name, description, quentity, measurementUnitId, createdBy, createdAt, updatedBy, updatedAt } = req.body
  productService.updateProductById(
    { organizationId, productTypeId, name, description, quentity, measurementUnitId, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(product => res.status(200).send(product))
    .catch(error => res.status(400).send(error))
})

// delete Product by id
router.delete('/:id', (req, res) => {
    productService.deleteProductById(req.params.id)
    .then(product => res.status(200).send(product))
    .catch(error => res.status(400).send(error))
})

module.exports = router
