const Product = require('../models/').Product
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createProduct (product) {
  return Product
    .create({
      organizationId: product.organizationId,
      productTypeId: product.productTypeId,
      name: product.name,
      description: product.description,
      quentity: product.quentity,
      measurementUnitId: product.measurementUnitId,
      createdBy: product.createdBy,
      createdAt: product.createdAt,
      updatedBy: product.updatedBy,
      updatedAt: product.updatedAt
    })
}

function getProductsDataCombo() {
  return Product.findAll({
    attributes: ['productId', 'name']
  });
}

function getAllProducts (skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split('~') || [];
    return Product.findAndCountAll({
      include: ['organization', 'productType', 'measurementUnit'],
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
      return Product.findAndCountAll({
        include: ['organization', 'productType', 'measurementUnit'],
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return Product.findAndCountAll({
        include: ['organization', 'productType', 'measurementUnit'],
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if((skip !== undefined) && (take !== undefined)){
    return Product.findAndCountAll({
      include: ['organization', 'productType', 'measurementUnit'],
      offset: skip,
      limit: take
    });
  }
  return Product.findAll();
}

function getProductById (productId) {
  return Product.findAll({
    include: ['organization', 'productType', 'measurementUnit'],
    where: {
      productId: productId
    }
  });
}

function updateProductById (product, productId) {
  return Product
    .update({
        organizationId: product.organizationId,
        productTypeId: product.productTypeId,
        name: product.name,
        description: product.description,
        quentity: product.quentity,
        measurementUnitId: product.measurementUnitId,
        createdBy: product.createdBy,
        createdAt: product.createdAt,
        updatedBy: product.updatedBy,
        updatedAt: product.updatedAt
    }, {
      where: {
        productId: productId
      }
    })
}

function deleteProductById (productId) {
  return Product
    .destroy({
      where: {
        productId: productId
      }
    })
}

module.exports = {
  createProduct: createProduct,
  getAllProducts: getAllProducts,
  getProductById: getProductById,
  updateProductById: updateProductById,
  deleteProductById: deleteProductById,
  getProductsDataCombo: getProductsDataCombo
}
