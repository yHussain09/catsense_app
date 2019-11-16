const ProductType = require('../models/').ProductType
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createProductType (productType) {
  return ProductType
    .create({
      organizationId: productType.organizationId,
      name: productType.name,
      description: productType.description,
      createdBy: productType.createdBy,
      createdAt: productType.createdAt,
      updatedBy: productType.updatedBy,
      updatedAt: productType.updatedAt
    })
}

function getProductTypesDataCombo() {
  return ProductType.findAll({
    attributes: ['organizationId', 'productTypeId', 'name']
  });
}

function getAllProductTypes (skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split('~') || [];
    return ProductType.findAndCountAll({
      include: ['organization'],
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
      return ProductType.findAndCountAll({
        include: ['organization'],
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return ProductType.findAndCountAll({
        include: ['organization'],
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if((skip !== undefined) && (take !== undefined)){
    return ProductType.findAndCountAll({
      include: ['organization'],
      offset: skip,
      limit: take
    });
  }
  return ProductType.findAll({include: ['organization']});
}

function getProductTypeById (productTypeId) {
  return ProductType.findByPk(productTypeId, {
    include: ['organization']
  })
}

function updateProductTypeById (productType, productTypeId) {
  return ProductType
    .update({
      organizationId: productType.organizationId,
      name: productType.name,
      description: productType.description,
      createdBy: productType.createdBy,
      createdAt: productType.createdAt,
      updatedBy: productType.updatedBy,
      updatedAt: productType.updatedAt
    }, {
      where: {
        productTypeId: productTypeId
      }
    })
}

function deleteProductTypeById (productTypeId) {
  return ProductType
    .destroy({
      where: {
        productTypeId: productTypeId
      }
    })
}

module.exports = {
  createProductType: createProductType,
  getAllProductTypes: getAllProductTypes,
  getProductTypeById: getProductTypeById,
  updateProductTypeById: updateProductTypeById,
  deleteProductTypeById: deleteProductTypeById,
  getProductTypesDataCombo: getProductTypesDataCombo
}
