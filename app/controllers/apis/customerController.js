'use strict'

const express = require('express')

const CustomerService = require('../../services/CustomerService')

const router = express.Router()

// create a new Customer
router.post('/', (req, res) => {
  const { customerTypeId, firstName, middleName, lastName, age, gender, contactNum, email, nic, address, createdBy, createdAt, updatedBy, updatedAt } = req.body
  CustomerService.createCustomer({ customerTypeId, firstName, middleName, lastName, age, gender, contactNum, email, nic, address, createdBy, createdAt, updatedBy, updatedAt })
    .then(customer => res.status(201).send(customer))
    .catch(error => res.status(400).send(error))
})

// get all Customer.
router.get('/', (req, res) => {
  CustomerService.getAllCustomers(+req.query.skip, +req.query.take, req.query.filter, req.query.orderby)
    .then(customer => res.status(201).send(customer))
    .catch(error => res.status(400).send(error))
})

// get Customer by id
router.get('/:id', (req, res) => {
  CustomerService.getCustomerById(req.params.id)
    .then(customer => res.status(200).send(customer))
    .catch(error => res.status(400).send(error))
})

// update Customer by id
router.put('/:id', (req, res) => {
  const { customerTypeId, firstName, middleName, lastName, age, gender, contactNum, email, nic, address, createdBy, createdAt, updatedBy, updatedAt } = req.body
  CustomerService.updateCustomerById({ customerTypeId, firstName, middleName, lastName, age, gender, contactNum, email, nic, address, createdBy, createdAt, updatedBy, updatedAt }, req.params.id)
    .then(customer => res.status(200).send(customer))
    .catch(error => res.status(400).send(error))
})

// delete Customer by id
router.delete('/:id', (req, res) => {
  CustomerService.deleteCustomerById(req.params.id)
    .then(customer => res.status(200).send(customer))
    .catch(error => res.status(400).send(error))
})

module.exports = router
