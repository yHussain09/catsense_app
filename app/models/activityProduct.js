'use strict'
module.exports = (sequelize, DataTypes) => {
  const ActivityProduct = sequelize.define('ActivityProduct', {
    activityProductId: {
        field: 'activity_product_id',
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    // activityId: {
    //     field: 'activity_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Activity',
    //         key: 'activity_id'
    //     }
    // },
    // productId: {
    //     field: 'product_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Product',
    //         key: 'product_id'
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
    version: true,
    underscored: true,
    tableName: 'activity_product'
  })
  ActivityProduct.associate = function (models) {
    // associations can be defined here
    ActivityProduct.belongsTo(models.Activity, { foreignKey: 'activityId', as: 'activity'})
    ActivityProduct.belongsTo(models.Product, { foreignKey: 'productId', as: 'product'})
    
  }
  return ActivityProduct
}
