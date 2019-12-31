'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActivityData = sequelize.define('ActivityData', {
    activityDataId: {
        field: 'activity_data_id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    activityId: {
      field: 'activity_id',
      allowNull: false,
      type: DataTypes.INTEGER
  },
    activityDate: {
        field: 'activity_date',
        type: DataTypes.DATE,
        allowNull: false
    },
    userId: {
      field: 'user_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    customerId: {
      field: 'customer_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cityId: {
      field: 'city_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    areaId: {
      field: 'area_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    storeId: {
      field: 'store_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      field: 'product_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productQuantity: {
        field: 'product_quantity',
        type: DataTypes.INTEGER,
        allowNull: false
    },
    productiveInterception: {
      field: 'productive_interception',
      type: DataTypes.STRING(1),
      allowNull: false
    },
    workingDay: {
      field: 'working_day',
      type: DataTypes.STRING(3),
      allowNull: false
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
    version: true
  });
  ActivityData.associate = function (models) {
    // associations can be defined here
    
  };
  return ActivityData;
};
