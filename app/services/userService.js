const User = require('../models/').User;
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function createUser (user) {
  return User
    .create({
      organizationId: user.organizationId,
      roleId: user.roleId,
      username: user.username,
      password: bcrypt.hashSync(user.password, 10),
      active: user.active, 
      createdBy: user.createdBy, 
      createdAt: user.createdAt, 
      updatedBy: user.updatedBy, 
      updatedAt: user.updatedAt
    });
}

function getUserDataCombo() {
  return User.findAll({
    attributes: ['organizationId','userId','username']
  });
}

function getAllUsers (skip, take, filter, orderby) {
  let users = {};
  if (filter) {
    let filters = filter.split('~') || [];
    users = User.findAndCountAll({
      include: ['organization', 'role'],
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
      users = User.findAndCountAll({
        include: ['organization', 'role'],
        offset: skip,
        limit: take,
        order: [orderby]
      });
    } else {
      const sort = orderby.split('~');
      users = User.findAndCountAll({
        include: ['organization', 'role'],
        offset: skip,
        limit: take,
        order: [
          [sort[0], sort[1]]
        ]
      });
    }
  }
  if ((skip !== undefined) && (take !== undefined)) {
    users = User.findAndCountAll({
      include: ['organization', 'role'],
      offset: skip,
      limit: take
    });
  }
  users = User.findAndCountAll({
    include: ['organization', 'role']
  });
  
  return users;
}

function getUserById (userId) {
  return User.findAll({
    where: {
      userId: userId
    },
    include: ['organization', 'role']
  });
}

function updateUserById (user, userId) {
  return User
    .update({
      organizationId: user.organizationId,
      roleId: user.roleId,
      username: user.username,
      password: bcrypt.hashSync(user.password, 10),
      active: user.active, 
      createdBy: user.createdBy, 
      createdAt: user.createdAt, 
      updatedBy: user.updatedBy, 
      updatedAt: user.updatedAt
    }, {
      where: {
        userId: userId
      }
    });
}

function deleteUserById (userId) {
  return User
    .destroy({
      where: {
        userId: userId
      }
    });
}

function getUserByUsername(username){
  return User.findAll({
    where: {
      username: username
    },
    include: ['organization', 'role']
  });
}

function isUserValid (requestPassword, userPassword){
  if(bcrypt.compareSync(requestPassword, userPassword)){
    return true;
  }
  else{  
    return false;
  }
}

module.exports = {
  createUser: createUser,
  getAllUsers: getAllUsers,
  getUserById: getUserById,
  updateUserById: updateUserById,
  deleteUserById: deleteUserById,
  getUserByUsername: getUserByUsername,
  isUserValid: isUserValid,
  getUserDataCombo: getUserDataCombo
};
