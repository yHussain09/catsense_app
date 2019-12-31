const CustomerType = require('../models/').CustomerType
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createCustomerType (customerType) {
  return CustomerType
    .create({
      name: customerType.name,
      description: customerType.description,
      createdBy: customerType.createdBy,
      createdAt: customerType.createdAt,
      updatedBy: customerType.updatedBy,
      updatedAt: customerType.updatedAt
    })
}

function getCustomerTypesDataCombo() {
  return CustomerType.findAll({
    attributes: ['customerTypeId', 'name']
  });
}


function getAllCustomerTypes (skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split('~') || [];
    return CustomerType.findAndCountAll({
      where: {
        name: {
          [Op.like]: '%' + filters[2] + '%'
        }
      },
      offset: skip,
      limit: take
    });
  }
  if (orderby) {
    if (!orderby.includes('~')) {
      return CustomerType.findAndCountAll({
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return CustomerType.findAndCountAll({
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if((skip !== undefined) && (take !== undefined)){
    return CustomerType.findAndCountAll({
      offset: skip,
      limit: take
    });
  }
  return CustomerType.findAll();
  // return CustomerType.findAll()
}

function getCustomerTypeById (customerTypeId) {
  return CustomerType.findAll({
    where: {
      customerTypeId: customerTypeId
    }
  })
}

function updateCustomerTypeById (customerType, customerTypeId) {
  return CustomerType
    .update({
      name: customerType.name,
      description: customerType.description,
      createdBy: customerType.createdBy,
      createdAt: customerType.createdAt,
      updatedBy: customerType.updatedBy,
      updatedAt: customerType.updatedAt
    }, {
      where: {
        customerTypeId: customerTypeId
      }
    })
}

function deleteCustomerTypeById (customerTypeId) {
  return CustomerType
    .destroy({
      where: {
        customerTypeId: customerTypeId
      }
    })
}

module.exports = {
  createCustomerType: createCustomerType,
  getAllCustomerTypes: getAllCustomerTypes,
  getCustomerTypeById: getCustomerTypeById,
  updateCustomerTypeById: updateCustomerTypeById,
  deleteCustomerTypeById: deleteCustomerTypeById,
  getCustomerTypesDataCombo: getCustomerTypesDataCombo
}
