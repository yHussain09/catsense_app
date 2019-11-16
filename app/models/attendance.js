'use strict'
module.exports = (sequelize, DataTypes) => {
  const Attendance = sequelize.define('Attendance', {
    // stodeId: {
    //     field: 'store_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Store',
    //         key: 'store_id'
    //     }
    // },
    // activityId: {
    //     field: 'activity_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Activity',
    //         key: 'activity_id'
    //       }
    // },
    // userId: {
    //     field: 'user_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'User',
    //         key: 'user_id'
    //       }
    // },
    attendanceId: {
      field: 'attendance_id',
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    checkIn: {
      field: 'check_in',
      type: DataTypes.DATE
    },
    checkOut: {
      field: 'check_out',
      type: DataTypes.DATE
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
    tableName: 'attendance'
  })
  Attendance.associate = function (models) {
    // associations can be defined here
    Attendance.belongsTo(models.Store, { foreignKey: 'storeId', as: 'store'})
    Attendance.belongsTo(models.Activity, { foreignKey: 'activityId', as: 'activity'})
    Attendance.belongsTo(models.User, { foreignKey: 'userId', as: 'user'})
    
  }
  return Attendance
}
