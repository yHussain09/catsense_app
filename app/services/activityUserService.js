const ActivityUser = require('../models/').ActivityUser
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createActivityUser (activityUser) {
  return ActivityUser
    .create({
      activityId: activityUser.activityId,
      userId: activityUser.userId,
      createdBy: activityUser.createdBy,
      createdAt: activityUser.createdAt,
      updatedBy: activityUser.updatedBy,
      updatedAt: activityUser.updatedAt
    })
}

function getAllActivityUsers (skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split('~') || [];
    return ActivityUser.findAndCountAll({
      include: ['active', 'user'],
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
      return ActivityUser.findAndCountAll({
        include: ['activity', 'user'],
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return ActivityUser.findAndCountAll({
        include: ['activity', 'user'],
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if((skip !== undefined) && (take !== undefined)){
    return ActivityUser.findAndCountAll({
      include: ['activity', 'user'],
      offset: skip,
      limit: take
    });
  }
  return ActivityUser.findAndCountAll({include: ['activity', 'user']});


  // return ActivityUser.findAll()
}

function getActivityUserById (activityUserId) {
  return ActivityUser.findByPk( activityUserId, {
    include: ['activity', 'user']
  })
}

function updateActivityUserById (activityUser, activityUserId) {
  return ActivityUser
    .update({
        activityId: activityUser.activityId,
        userId: activityUser.userId,
        createdBy: activityUser.createdBy,
        createdAt: activityUser.createdAt,
        updatedBy: activityUser.updatedBy,
        updatedAt: activityUser.updatedAt
    }, {
      where: {
        activityUserId: activityUserId
      }
    })
}

function deleteActivityUserById (activityUserId) {
  return ActivityUser
    .destroy({
      where: {
        activityUserId: activityUserId
      }
    })
}

module.exports = {
  createActivityUser: createActivityUser,
  getAllActivityUsers: getAllActivityUsers,
  getActivityUserById: getActivityUserById,
  updateActivityUserById: updateActivityUserById,
  deleteActivityUserById: deleteActivityUserById
}
