const UserStore = require('../models/').UserStore;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function createUserStore (userStore) {
  return UserStore
    .create({
      UserId: userStore.UserId,
      storeId: userStore.storeId,
      createdBy: userStore.createdBy,
      createdAt: userStore.createdAt,
      updatedBy: userStore.updatedBy,
      updatedAt: userStore.updatedAt
    });
}

function getAllUserStores (skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split('~') || [];
    return UserStore.findAndCountAll({
      include: ['user', 'store'],
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
      return UserStore.findAndCountAll({
        include: ['user', 'store'],
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return UserStore.findAndCountAll({
        include: ['user', 'store'],
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if((skip !== undefined) && (take !== undefined)){
    return UserStore.findAndCountAll({
      include: ['user', 'store'],
      offset: skip,
      limit: take
    });
  }
  return UserStore.findAll({include: ['user', 'store']});
}

function getUserStoreById (userStoreId) {
  return UserStore.findByPk( userStoreId, {
    include: ['user', 'store']
  });
}

function updateUserStoreById (userStore, userStoreId) {
  return UserStore
    .update({
        UserId: userStore.userId,
        storeId: userStore.storeId,
        createdBy: userStore.createdBy,
        createdAt: userStore.createdAt,
        updatedBy: userStore.updatedBy,
        updatedAt: userStore.updatedAt
    }, {
      where: {
        userStoreId: userStoreId
      }
    });
}

function deleteUserStoreById (userStoreId) {
  return UserStore
    .destroy({
      where: {
        userStoreId: userStoreId
      }
    });
}

module.exports = {
  createUserStore: createUserStore,
  getAllUserStores: getAllUserStores,
  getUserStoreById: getUserStoreById,
  updateUserStoreById: updateUserStoreById,
  deleteUserStoreById: deleteUserStoreById
};
