const ActivityData = require('../models/').ActivityData
// const Sequelize = require('sequelize')
// const Op = Sequelize.Op

function createActivityData (activityData) {
  return ActivityData
    .create({
      activityId: activityData.activityId,
      customerId: activityData.customerId,
      userId: activityData.userId,
      productId: activityData.productId,
      productQuentity: activityData.productQuentity,
      measurementUnitId: activityData.measurementUnitId,
      createdBy: activityData.createdBy,
      createdAt: activityData.createdAt,
      updatedBy: activityData.updatedBy,
      updatedAt: activityData.updatedAt
    })
}

function getAllActivityDatas () {
  return ActivityData.findAll()
}

function getActivityDataById (activityDataId) {
  return ActivityData.findAll({
    where: {
      activityDataId: activityDataId
    }
  })
}

function updateActivityDataById (activityData, activityDataId) {
  return ActivityData
    .update({
      activityId: activityData.activityId,
      customerId: activityData.customerId,
      userId: activityData.userId,
      productId: activityData.productId,
      productQuentity: activityData.productQuentity,
      measurementUnitId: activityData.measurementUnitId,
      createdBy: activityData.createdBy,
      createdAt: activityData.createdAt,
      updatedBy: activityData.updatedBy,
      updatedAt: activityData.updatedAt
    }, {
      where: {
        activityDataId: activityDataId
      }
    })
}

function deleteActivityDataById (activityDataId) {
  return ActivityData
    .destroy({
      where: {
        activityDataId: activityDataId
      }
    })
}

module.exports = {
  createActivityData: createActivityData,
  getAllActivityDatas: getAllActivityDatas,
  getActivityDataById: getActivityDataById,
  updateActivityDataById: updateActivityDataById,
  deleteActivityDataById: deleteActivityDataById
}
