'use strict';
module.exports = (sequelize, DataTypes) => {
  const Activity = sequelize.define('Activity', {
    // organizationId: {
    //     field: 'organization_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Organization',
    //         key: 'organization_id'
    //     }
    // },
    activityId: {
        field: 'activity_id',
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
    days: {
        field: 'days',
        type: DataTypes.INTEGER
    },
    startDate: {
        field: 'start_date',
        type: DataTypes.DATE
    },
    endDate: {
        field: 'end_date',
        type: DataTypes.DATE
    },
    // active: {
    //   field: 'active',
    //   type: DataTypes.STRING(1)
    // },
    // activityStatus: {
    //     field: 'activity_status',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //       model: 'ActivityStatus',
    //       key: 'activity_status_id'
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
    tableName: 'activity'
  });
  Activity.associate = function (models) {
    // associations can be defined here
    Activity.belongsTo(models.Organization, { foreignKey: 'organizationId', as: 'organization'});
    // Activity.belongsTo(models.Country, { foreignKey: 'countryId', as: 'country'})
    // Activity.belongsTo(models.City, { foreignKey: 'cityId', as: 'city'})
    // Activity.belongsTo(models.Area, { foreignKey: 'areaId', as: 'area'})
    // Activity.belongsTo(models.Store, { foreignKey: 'storeId', as: 'store'})
    Activity.belongsTo(models.ActivityStatus, { foreignKey: 'activityStatusId', as: 'activityStatus'});
    
  };
  return Activity;
};
