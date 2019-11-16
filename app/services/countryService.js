const Country = require('../models/').Country
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createCountry (country) {
  return Country
    .create({
      name: country.name,
      description: country.description,
      createdBy: country.createdBy,
      createdAt: country.createdAt,
      updatedBy: country.updatedBy,
      updatedAt: country.updatedAt
    })
}

function getCountrysDataCombo() {
  return Country.findAll({
    attributes: ['countryId', 'name']
  });
}

function getAllCountrys (skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split('~') || [];
    return Country.findAndCountAll({
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
      return Country.findAndCountAll({
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return Country.findAndCountAll({
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if((skip !== undefined) && (take !== undefined)){
    return Country.findAndCountAll({
      offset: skip,
      limit: take
    });
  }
  return Country.findAll();
}

function getCountryById (countryId) {
  return Country.findAll({
    where: {
      countryId: countryId
    }
  })
}

function updateCountryById (country, countryId) {
  return Country
    .update({
      name: country.name,
      description: country.description,
      createdBy: country.createdBy,
      createdAt: country.createdAt,
      updatedBy: country.updatedBy,
      updatedAt: country.updatedAt
    }, {
      where: {
        countryId: countryId
      }
    })
}

function deleteCountryById (countryId) {
  return Country
    .destroy({
      where: {
        countryId: countryId
      }
    })
}

module.exports = {
  createCountry: createCountry,
  getAllCountrys: getAllCountrys,
  getCountryById: getCountryById,
  updateCountryById: updateCountryById,
  deleteCountryById: deleteCountryById,
  getCountrysDataCombo: getCountrysDataCombo
}
