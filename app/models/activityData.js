'use strict'
module.exports = (sequelize, DataTypes) => {
  const ActivityData = sequelize.define('ActivityData', {
    // activityId: {
    //     field: 'activity_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Activity',
    //         key: 'activity_id'
    //     }
    // },
    // customerId: {
    //     field: 'customer_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Customer',
    //         key: 'customer_id'
    //     }
    // },
    // userId: {
    //     field: 'user_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'User',
    //         key: 'user_id'
    //     }
    // },
    activityDataId: {
        field: 'activity_data_id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    // productId: {
    //     field: 'product_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Product',
    //         key: 'product_id'
    //     }
    // },
    productQuentity: {
        field: 'product_quentity',
        type: DataTypes.INTEGER
    },
    // measurementUnitId: {
    //     field: 'measurement_unit_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'MeasurementUnit',
    //         key: 'measurement_unit_id'
    //     }
    // },
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
  })
  ActivityData.associate = function (models) {
    // associations can be defined here
    
  }
  return ActivityData
}
