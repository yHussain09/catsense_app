'use strict'
module.exports = (sequelize, DataTypes) => {
  const Organization = sequelize.define('Organization', {
    organizationId: {
      field: 'organization_id',
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(100)
    },
    description: {
      field: 'description',
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
    tableName: 'organization'
  })
  Organization.associate = function (models) {
    // associations can be defined here
    // 1:N
    // Organization.hasMany(models.Role, { foreignKey: 'role_id', as: 'roles'})
    // 1:N
    // Organization.hasMany(models.ProductType, { foreignKey: 'product_type_id', as: 'productTypes'})
    // 1:N
    // Organization.hasMany(models.User, { foreignKey: 'user_id', as: 'users'})
    
  }
  return Organization
}
