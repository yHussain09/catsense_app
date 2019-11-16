const ActivityStore = require('../models/').ActivityStore
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createActivityStore (activityStore) {
  return ActivityStore
    .create({
      activityId: activityStore.activityId,
      storeId: activityStore.storeId,
      createdBy: activityStore.createdBy,
      createdAt: activityStore.createdAt,
      updatedBy: activityStore.updatedBy,
      updatedAt: activityStore.updatedAt
    })
}

function getAllActivityStores (skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split('~') || [];
    return ActivityStore.findAndCountAll({
      include: ['active', 'store'],
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
      return ActivityStore.findAndCountAll({
        include: ['activity', 'store'],
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return ActivityStore.findAndCountAll({
        include: ['activity', 'store'],
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if((skip !== undefined) && (take !== undefined)){
    return ActivityStore.findAndCountAll({
      include: ['activity', 'store'],
      offset: skip,
      limit: take
    });
  }
  return ActivityStore.findAll({include: ['activity', 'store']});
}

function getActivityStoreById (activityStoreId) {
  return ActivityStore.findByPk( activityStoreId, {
    include: ['activity', 'store']
  })
}

function updateActivityStoreById (activityStore, activityStoreId) {
  return ActivityStore
    .update({
        activityId: activityStore.activityId,
        storeId: activityStore.storeId,
        createdBy: activityStore.createdBy,
        createdAt: activityStore.createdAt,
        updatedBy: activityStore.updatedBy,
        updatedAt: activityStore.updatedAt
    }, {
      where: {
        activityStoreId: activityStoreId
      }
    })
}

function deleteActivityStoreById (activityStoreId) {
  return ActivityStore
    .destroy({
      where: {
        activityStoreId: activityStoreId
      }
    })
}

module.exports = {
  createActivityStore: createActivityStore,
  getAllActivityStores: getAllActivityStores,
  getActivityStoreById: getActivityStoreById,
  updateActivityStoreById: updateActivityStoreById,
  deleteActivityStoreById: deleteActivityStoreById
}
