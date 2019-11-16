const MeasurementUnit = require('../models/').MeasurementUnit
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createMeasurementUnit (measurementUnit) {
  return MeasurementUnit
    .create({
      name: measurementUnit.name,
      description: measurementUnit.description,
      createdBy: measurementUnit.createdBy,
      createdAt: measurementUnit.createdAt,
      updatedBy: measurementUnit.updatedBy,
      updatedAt: measurementUnit.updatedAt
    })
}

function getMeasurementUnitsDataCombo() {
  return MeasurementUnit.findAll({
    attributes: ['measurementUnitId', 'name']
  });
}

function getAllMeasurementUnits (skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split('~') || [];
    return MeasurementUnit.findAndCountAll({
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
      return MeasurementUnit.findAndCountAll({
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return MeasurementUnit.findAndCountAll({
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if((skip !== undefined) && (take !== undefined)){
    return MeasurementUnit.findAndCountAll({
      offset: skip,
      limit: take
    });
  }
  return MeasurementUnit.findAll();
}

function getMeasurementUnitById (measurementUnitId) {
  return MeasurementUnit.findAll({
    where: {
        measurementUnitId: measurementUnitId
    }
  })
}

function updateMeasurementUnitById (measurementUnit, measurementUnitId) {
  return MeasurementUnit
    .update({
      name: measurementUnit.name,
      description: measurementUnit.description,
      createdBy: measurementUnit.createdBy,
      createdAt: measurementUnit.createdAt,
      updatedBy: measurementUnit.updatedBy,
      updatedAt: measurementUnit.updatedAt
    }, {
      where: {
        measurementUnitId: measurementUnitId
      }
    })
}

function deleteMeasurementUnitById (measurementUnitId) {
  return MeasurementUnit
    .destroy({
      where: {
        measurementUnitId: measurementUnitId
      }
    })
}

module.exports = {
  createMeasurementUnit: createMeasurementUnit,
  getAllMeasurementUnits: getAllMeasurementUnits,
  getMeasurementUnitById: getMeasurementUnitById,
  updateMeasurementUnitById: updateMeasurementUnitById,
  deleteMeasurementUnitById: deleteMeasurementUnitById,
  getMeasurementUnitsDataCombo: getMeasurementUnitsDataCombo
}
