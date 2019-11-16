const Area = require('../models/').Area
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createArea (area) {
  return Area
    .create({
      countryId: area.countryId,
      cityId: area.cityId,
      name: area.name,
      description: area.description,
      createdBy: area.createdBy,
      createdAt: area.createdAt,
      updatedBy: area.updatedBy,
      updatedAt: area.updatedAt
    })
}

function getAreasDataCombo() {
  return Area.findAll({
    attributes: ['cityId', 'areaId', 'name']
  });
}

function getAllAreas (skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split('~') || [];
    return Area.findAndCountAll({
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
      return Area.findAndCountAll({
        include: ['country', 'city'],
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return Area.findAndCountAll({
        include: ['country', 'city'],
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if((skip !== undefined) && (take !== undefined)){
    return Area.findAndCountAll({
      include: ['country', 'city'],
      offset: skip,
      limit: take
    });
  }
  return Area.findAll({include: ['country', 'city']});
}

function getAreaById (areaId) {
  return Area.findByPk( areaId, {
    include: ['country', 'city']
  })
}

function updateAreaById (area, areaId) {
  return Area
    .update({
        countryId: area.countryId,
        cityId: area.cityId,
        name: area.name,
        description: area.description,
        createdBy: area.createdBy,
        createdAt: area.createdAt,
        updatedBy: area.updatedBy,
        updatedAt: area.updatedAt
    }, {
      where: {
        areaId: areaId
      }
    })
}

function deleteAreaById (areaId) {
  return Area
    .destroy({
      where: {
        areaId: areaId
      }
    })
}

module.exports = {
  createArea: createArea,
  getAllAreas: getAllAreas,
  getAreaById: getAreaById,
  updateAreaById: updateAreaById,
  deleteAreaById: deleteAreaById,
  getAreasDataCombo: getAreasDataCombo
}
