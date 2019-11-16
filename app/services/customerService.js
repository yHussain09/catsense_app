const Customer = require('../models/').Customer
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createCustomer (customer) {
  return Customer
    .create({
      customerTypeId: customer.customerTypeId,
      firstName: customer.firstName,
      middleName: customer.middleName,
      lastName: customer.lastName,
      age: customer.age,
      gender: customer.gender,
      contactNum: customer.contactNum,
      email: customer.email,
      nic: customer.nic,
      address: customer.address,
      createdBy: customer.createdBy,
      createdAt: customer.createdAt,
      updatedBy: customer.updatedBy,
      updatedAt: customer.updatedAt
    })
}

function getAllCustomers () {
  return Customer.findAll()
}

function getCustomerById (customerId) {
  return Customer.findByPk( customerId, {
    include: ['customerType']
  })
}

function updateCustomerById (customer, customerId) {
  return Customer
    .update({
        customerTypeId: customer.customerTypeId,
        firstName: customer.firstName,
        middleName: customer.middleName,
        lastName: customer.lastName,
        age: customer.age,
        gender: customer.gender,
        contactNum: customer.contactNum,
        email: customer.email,
        nic: customer.nic,
        address: customer.address,
        createdBy: customer.createdBy,
        createdAt: customer.createdAt,
        updatedBy: customer.updatedBy,
        updatedAt: customer.updatedAt
    }, {
      where: {
        customerId: customerId
      }
    })
}

function deleteCustomerById (customerId) {
  return Customer
    .destroy({
      where: {
        customerId: customerId
      }
    })
}

module.exports = {
  createCustomer: createCustomer,
  getAllCustomers: getAllCustomers,
  getCustomerById: getCustomerById,
  updateCustomerById: updateCustomerById,
  deleteCustomerById: deleteCustomerById
}
