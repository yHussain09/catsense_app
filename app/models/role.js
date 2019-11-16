'use strict'
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    // organizationId: {
    //     field: 'organization_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     // references: {
    //     //     model: 'Organization',
    //     //     key: 'organization_id'
    //     //   }
    // },
    roleId: {
      field: 'role_id',
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
    tableName: 'role'
  })
  Role.associate = function (models) {
    // associations can be defined here
    // 1:1
    Role.belongsTo(models.Organization, { foreignKey: 'organizationId', as: 'organization'})
    // 1:N
    // Role.hasMany(models.User, { foreignKey: 'user_Id', as: 'users'})
    
  }
  return Role
}
