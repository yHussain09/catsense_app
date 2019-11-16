const Activity = require('../models/').Activity
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createActivity (activity) {
  return Activity
    .create({
      organizationId: activity.organizationId,
      // countryId: activity.countryId,
      // cityId: activity.cityId,
      // areaId: activity.areaId,
      // storeId: activity.storeId,
      activityStatusId: activity.activityStatusId,
      name: activity.name,
      description: activity.description,
      days: activity.days,
      startDate: activity.startDate,
      endDate: activity.endDate,
      // activityStatusId: activity.activityStatusId,
      createdBy: activity.createdBy,
      createdAt: activity.createdAt,
      updatedBy: activity.updatedBy,
      updatedAt: activity.updatedAt
    })
}

function getAllActivitys (skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split('~') || [];
    return Activity.findAndCountAll({
      include: ['organization', 'activityStatus'],
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
      return Activity.findAndCountAll({
        include: ['organization', 'activityStatus'],
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return Activity.findAndCountAll({
        include: ['organization', 'activityStatus'],
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if((skip !== undefined) && (take !== undefined)){
    return Activity.findAndCountAll({
      include: ['organization', 'activityStatus'],
      offset: skip,
      limit: take
    });
  }
  return Activity.findAll({include: ['organization', 'activityStatus']});
  // return Activity.findAll()
}

function getActivityDataCombo() {
  return Activity.findAll({
    attributes: ['organizationId', 'activityId', 'name']
  });
}

function getActivityById (activityId) {
  return Activity.findByPk( activityId, {
    include: ['organization', 'activityStatus']
  })
}

function updateActivityById (activity, activityId) {
  return Activity
    .update({
        organizationId: activity.organizationId,
        // countryId: activity.countryId,
        // cityId: activity.cityId,
        // areaId: activity.areaId,
        // storeId: activity.storeId,
        activityStatusId: activity.activityStatusId,
        name: activity.name,
        description: activity.description,
        days: activity.days,
        startDate: activity.startDate,
        endDate: activity.endDate,
        // activityStatus: activity.activityStatus,
        createdBy: activity.createdBy,
        createdAt: activity.createdAt,
        updatedBy: activity.updatedBy,
        updatedAt: activity.updatedAt
    }, {
      where: {
        activityId: activityId
      }
    })
}

function deleteActivityById (activityId) {
  return Activity
    .destroy({
      where: {
        activityId: activityId
      }
    })
}

module.exports = {
  createActivity: createActivity,
  getAllActivitys: getAllActivitys,
  getActivityById: getActivityById,
  updateActivityById: updateActivityById,
  deleteActivityById: deleteActivityById,
  getActivityDataCombo: getActivityDataCombo
}
