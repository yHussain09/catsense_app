'use strict'
module.exports = (sequelize, DataTypes) => {
  const ActivityUser = sequelize.define('ActivityUser', {
    activityUserId: {
        field: 'activity_user_id',
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
    // userId: {
    //     field: 'user_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'User',
    //         key: 'user_id'
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
    tableName: 'activity_user'
  })
  ActivityUser.associate = function (models) {
    // associations can be defined here
    ActivityUser.belongsTo(models.Activity, { foreignKey: 'activityId', as: 'activity'})
    ActivityUser.belongsTo(models.User, { foreignKey: 'userId', as: 'user'})
    
  }
  return ActivityUser
}
