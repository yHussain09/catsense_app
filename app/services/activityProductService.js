const ActivityProduct = require('../models/').ActivityProduct
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createActivityProduct (activityProduct) {
  return ActivityProduct
    .create({
      activityId: activityProduct.activityId,
      productId: activityProduct.productId,
      createdBy: activityProduct.createdBy,
      createdAt: activityProduct.createdAt,
      updatedBy: activityProduct.updatedBy,
      updatedAt: activityProduct.updatedAt
    })
}

function getAllActivityProducts (skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split('~') || [];
    return ActivityProduct.findAndCountAll({
      include: ['activity', 'product'],
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
      return ActivityProduct.findAndCountAll({
        include: ['activity', 'product'],
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return ActivityProduct.findAndCountAll({
        include: ['activity', 'product'],
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if((skip !== undefined) && (take !== undefined)){
    return ActivityProduct.findAndCountAll({
      include: ['activity', 'product'],
      offset: skip,
      limit: take
    });
  }
  return ActivityProduct.findAndCountAll({include: ['activity', 'product']});

  // return ActivityProduct.findAll(include: ['activity', 'product'])
}

function getActivityProductById (activityProductId) {
  return ActivityProduct.findByPk( activityProductId, {
    include: ['activity', 'product']
  })
}

function updateActivityProductById (activityProduct, activityProductId) {
  return ActivityProduct
    .update({
        activityId: activityProduct.activityId,
        productId: activityProduct.productId,
        createdBy: activityProduct.createdBy,
        createdAt: activityProduct.createdAt,
        updatedBy: activityProduct.updatedBy,
        updatedAt: activityProduct.updatedAt
    }, {
      where: {
        activityProductId: activityProductId
      }
    })
}

function deleteActivityProductById (activityProductId) {
  return ActivityProduct
    .destroy({
      where: {
        activityProductId: activityProductId
      }
    })
}

module.exports = {
  createActivityProduct: createActivityProduct,
  getAllActivityProducts: getAllActivityProducts,
  getActivityProductById: getActivityProductById,
  updateActivityProductById: updateActivityProductById,
  deleteActivityProductById: deleteActivityProductById
}
