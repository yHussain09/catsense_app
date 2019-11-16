const City = require('../models/').City
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createCity (city) {
  return City
    .create({
      countryId: city.countryId,
      name: city.name,
      description: city.description,
      createdBy: city.createdBy,
      createdAt: city.createdAt,
      updatedBy: city.updatedBy,
      updatedAt: city.updatedAt
    })
}

function getCitysDataCombo() {
  return City.findAll({
    attributes: ['countryId', 'cityId', 'name']
  });
}

function getAllCitys (skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split('~') || [];
    return City.findAndCountAll({
      include: ['country'],
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
      return City.findAndCountAll({
        include: ['country'],
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return City.findAndCountAll({
        include: ['country'],
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if((skip !== undefined) && (take !== undefined)){
    return City.findAndCountAll({
      include: ['country'],
      offset: skip,
      limit: take
    });
  }
  return City.findAll({include: ['country']});
}

function getCityById (cityId) {
  return City.findByPk( cityId, {
    include: ['country']
  })
}

function updateCityById (city, cityId) {
  return City
    .update({
      countryId: city.countryId,
      name: city.name,
      description: city.description,
      createdBy: city.createdBy,
      createdAt: city.createdAt,
      updatedBy: city.updatedBy,
      updatedAt: city.updatedAt
    }, {
      where: {
        cityId: cityId
      }
    })
}

function deleteCityById (cityId) {
  return City
    .destroy({
      where: {
        cityId: cityId
      }
    })
}

module.exports = {
  createCity: createCity,
  getAllCitys: getAllCitys,
  getCityById: getCityById,
  updateCityById: updateCityById,
  deleteCityById: deleteCityById,
  getCitysDataCombo: getCitysDataCombo
}
