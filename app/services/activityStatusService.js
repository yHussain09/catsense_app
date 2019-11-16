const ActivityStatus = require('../models/').ActivityStatus
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createActivityStatus (activityStatus) {
  return ActivityStatus
    .create({
      name: activityStatus.name,
      description: activityStatus.description,
      createdBy: activityStatus.createdBy,
      createdAt: activityStatus.createdAt,
      updatedBy: activityStatus.updatedBy,
      updatedAt: activityStatus.updatedAt
    })
}

function getAllActivityStatus (skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split('~') || [];
    return ActivityStatus.findAndCountAll({
      include: ['country', 'city'],
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
      return ActivityStatus.findAndCountAll({
        include: ['country', 'city'],
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return ActivityStatus.findAndCountAll({
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if((skip !== undefined) && (take !== undefined)){
    return ActivityStatus.findAndCountAll({
      offset: skip,
      limit: take
    });
  }
  return ActivityStatus.findAll();
}

function getActivityStatusDataCombo() {
  return ActivityStatus.findAll({
    attributes: ['activityStatusId', 'name']
  });
}

function getActivityStatusById (activityStatusId) {
  return ActivityStatus.findAll({
    where: {
      activityStatusId: activityStatusId
    }
  })
}

function updateActivityStatusById (activityStatus, activityStatusId) {
  return ActivityStatus
    .update({
      name: activityStatus.name,
      description: activityStatus.description,
      createdBy: activityStatus.createdBy,
      createdAt: activityStatus.createdAt,
      updatedBy: activityStatus.updatedBy,
      updatedAt: activityStatus.updatedAt
    }, {
      where: {
        activityStatusId: activityStatusId
      }
    })
}

function deleteActivityStatusById (activityStatusId) {
  return ActivityStatus
    .destroy({
      where: {
        activityStatusId: activityStatusId
      }
    })
}

module.exports = {
  createActivityStatus: createActivityStatus,
  getAllActivityStatus: getAllActivityStatus,
  getActivityStatusById: getActivityStatusById,
  updateActivityStatusById: updateActivityStatusById,
  deleteActivityStatusById: deleteActivityStatusById,
  getActivityStatusDataCombo: getActivityStatusDataCombo
}
