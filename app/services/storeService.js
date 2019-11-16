const Store = require('../models/').Store
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createStore (store) {
  return Store
    .create({
      countryId: store.countryId,
      cityId: store.cityId,
      areaId: store.areaId,
      name: store.name,
      description: store.description,
      active: store.active,
      createdBy: store.createdBy,
      createdAt: store.createdAt,
      updatedBy: store.updatedBy,
      updatedAt: store.updatedAt
    })
}

function getStoresDataCombo() {
  return Store.findAll({
    attributes: ['areaId','storeId', 'name']
  });
}

function getAllStores (skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split('~') || [];
    return Store.findAndCountAll({
      include: ['country', 'city', 'area'],
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
      return Store.findAndCountAll({
        include: ['country', 'city', 'area'],
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return Store.findAndCountAll({
        include: ['country', 'city', 'area'],
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if((skip !== undefined) && (take !== undefined)){
    return Store.findAndCountAll({
      include: ['country', 'city', 'area'],
      offset: skip,
      limit: take
    });
  }
  return Store.findAll({include: ['country', 'city', 'area']});
}

function getStoreById (storeId) {
  return Store.findByPk( storeId, {
    include: ['country', 'city', 'area']
  })
}

function updateStoreById (store, storeId) {
  return Store
    .update({
        countryId: store.countryId,
      cityId: store.cityId,
      areaId: store.areaId,
      name: store.name,
      description: store.description,
      active: store.active,
      createdBy: store.createdBy,
      createdAt: store.createdAt,
      updatedBy: store.updatedBy,
      updatedAt: store.updatedAt
    }, {
      where: {
        storeId: storeId
      }
    })
}

function deleteStoreById (storeId) {
  return Store
    .destroy({
      where: {
        storeId: storeId
      }
    })
}

module.exports = {
  createStore: createStore,
  getAllStores: getAllStores,
  getStoreById: getStoreById,
  updateStoreById: updateStoreById,
  deleteStoreById: deleteStoreById,
  getStoresDataCombo: getStoresDataCombo
}
