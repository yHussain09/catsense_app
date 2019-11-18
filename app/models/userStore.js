'use strict'
module.exports = (sequelize, DataTypes) => {
  const UserStore = sequelize.define('UserStore', {
    userStoreId: {
        field: 'user_store_id',
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
    tableName: 'user_store'
  });
  UserStore.associate = function (models) {
    // associations can be defined here
    UserStore.belongsTo(models.User, { foreignKey: 'userId', as: 'user'});
    UserStore.belongsTo(models.Store, { foreignKey: 'storeId', as: 'store'});
  };
  return UserStore;
};
