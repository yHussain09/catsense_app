'use strict'
module.exports = (sequelize, DataTypes) => {
  const ActivityStore = sequelize.define('ActivityStore', {
    activityStoreId: {
        field: 'activity_Store_id',
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
    // storeId: {
    //     field: 'store_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Store',
    //         key: 'store_id'
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
    tableName: 'activity_store'
  })
  ActivityStore.associate = function (models) {
    // associations can be defined here
    ActivityStore.belongsTo(models.Activity, { foreignKey: 'activityId', as: 'activity'})
    ActivityStore.belongsTo(models.Store, { foreignKey: 'storeId', as: 'store'})
    
  }
  return ActivityStore
}
