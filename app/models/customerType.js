'use strict'
module.exports = (sequelize, DataTypes) => {
  const CustomerType = sequelize.define('CustomerType', {
    customerTypeId: {
      field: 'customer_type_id',
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      // unique: true
    },
    name: {
      field: 'name',
      type: DataTypes.STRING(100),
      // unique: true
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
    tableName: 'customer_type'
  })
  CustomerType.associate = function (models) {
    // associations can be defined here

  }
  return CustomerType
}