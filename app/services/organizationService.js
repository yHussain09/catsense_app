const Organization = require('../models/').Organization
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createOrganization(organization) {
  return Organization
    .create({
      name: organization.name,
      description: organization.description,
      active: organization.active,
      createdBy: organization.createdBy,
      createdAt: organization.createdAt,
      updatedBy: organization.updatedBy,
      updatedAt: organization.updatedAt
    })
}

function getOrganizationsDataCombo() {
  return Organization.findAll({
    attributes: ['organizationId', 'name']
    // attributes: [
    //   ['organization_id', 'code'], 
    //   ['name', 'description']
    // ]
  });
}

function getAllOrganizations(skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split('~') || [];
    return Organization.findAndCountAll({
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
      return Organization.findAndCountAll({
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return Organization.findAndCountAll({
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if((skip !== undefined) && (take !== undefined)){
    return Organization.findAndCountAll({
      offset: skip,
      limit: take
    });
  }
  return Organization.findAll();
}

function getOrganizationById(organizationId) {
  return Organization.findAll({
    where: {
      organizationId: organizationId
    }
  });
  // return Organization.findByPk( organizationId, {
  //   include: [{
  //     model: Role,
  //     as: 'roles'
  //   }]
  // })
}

function updateOrganizationById(organization, organizationId) {
  return Organization
    .update({
      name: organization.name,
      description: organization.description,
      active: organization.active,
      createdBy: organization.createdBy,
      createdAt: organization.createdAt,
      updatedBy: organization.updatedBy,
      updatedAt: organization.updatedAt
    }, {
      where: {
        organizationId: organizationId
      }
    })
}

function deleteOrganizationById(organizationId) {
  return Organization
    .destroy({
      where: {
        organizationId: organizationId
      }
    })
}

module.exports = {
  createOrganization: createOrganization,
  getAllOrganizations: getAllOrganizations,
  getOrganizationById: getOrganizationById,
  updateOrganizationById: updateOrganizationById,
  deleteOrganizationById: deleteOrganizationById,
  getOrganizationsDataCombo: getOrganizationsDataCombo
}