'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // organizationId: {
    //     field: 'organization_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     // references: {
    //     //     model: 'Organization',
    //     //     key: 'organization_id'
    //     //   }
    // },
    // roleId: {
    //     field: 'role_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     // references: {
    //     //     model: 'Role',
    //     //     key: 'role_id'
    //     //   }
    // },
    userId: {
      field: 'user_id',
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      field: 'user_name',
      type: DataTypes.STRING(100)
    },
    password: {
      field: 'password',
      type: DataTypes.STRING(255)
    },
    active: {
        field: 'active',
        type: DataTypes.STRING(1)
    },
    createdBy: {
      field: 'created_by',
      type: DataTypes.STRING(255)
    },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW
    },
    updatedBy: {
      field: 'updated_by',
      type: DataTypes.STRING(255)
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.NOW,
      onUpdate: sequelize.NOW
    }
  }, {
    freezeTableName: true,
    version: true,
    underscored: true,
    tableName: 'user'
  })
  User.associate = function (models) {
    // associations can be defined here
    // 1:1
    User.belongsTo(models.Organization, {foreignKey: 'organizationId', as: 'organization'})
    // User.belongsTo(models.Role, {foreignKey: 'role_Id', targetKey: 'roleId'})
    // 1:1
    User.belongsTo(models.Role, {foreignKey: 'roleId', as: 'role'})
    // User.belongsTo(models.Role, {foreignKey: 'roleId', targetKey: 'roleId'})
    
  }
  return User
}
