const Role = require('../models/').Role
const Sequelize = require('sequelize')
const Op = Sequelize.Op

function createRole(role) {
  return Role
    .create({
      organizationId: role.organizationId,
      name: role.name,
      description: role.description,
      createdBy: role.createdBy,
      createdAt: role.createdAt,
      updatedBy: role.updatedBy,
      updatedAt: role.updatedAt
    })
}

function getRolesDataCombo() {
  return Role.findAll({
    attributes: ['organizationId','roleId','name']
  });
}

function getAllRoles(skip, take, filter, orderby) {
  if (filter) {
    let filters = filter.split(',') || [];
    let filterFiled = filter[0];
    let filterOpt = filter[1];
    let filterVal = filter[2];
    

    return Role.findAndCountAll({
      include: ['organization'],
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
      return Role.findAndCountAll({
        include: ['organization'],
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      return Role.findAndCountAll({
        include: ['organization'],
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      })
    }
  }
  if ((skip !== undefined) && (take !== undefined)) {
    return Role.findAndCountAll({
      include: ['organization'],
      offset: skip,
      limit: take
    });
  }
  return Role.findAndCountAll({
    include: ['organization']
  });
}

function getRoleById(roleId) {
  return Role.findAll({
    where: {
      roleId: roleId
    },
    include: ['organization']
  });
}

function updateRoleById(role, roleId) {
  return Role
    .update({
      organizationId: role.organizationId,
      name: role.name,
      description: role.description,
      createdBy: role.createdBy,
      createdAt: role.createdAt,
      updatedBy: role.updatedBy,
      updatedAt: role.updatedAt
    }, {
      where: {
        roleId: roleId
      }
    })
}

function deleteRoleById(roleId) {
  return Role
    .destroy({
      where: {
        roleId: roleId
      }
    })
}

module.exports = {
  createRole: createRole,
  getAllRoles: getAllRoles,
  getRoleById: getRoleById,
  updateRoleById: updateRoleById,
  deleteRoleById: deleteRoleById,
  getRolesDataCombo: getRolesDataCombo
}