'use strict';
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    // countryId: {
    //     field: 'country_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Country',
    //         key: 'country_id'
    //       }
    // },
    // cityId: {
    //     field: 'city_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'City',
    //         key: 'city_id'
    //       }
    // },
    // areaId: {
    //     field: 'area_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Area',
    //         key: 'area_id'
    //       }
    // },
    storeId: {
      field: 'store_id',
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
    active: {
        field: 'active',
        type: DataTypes.STRING(100)
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
    tableName: 'store'
  });
  Store.associate = function (models) {
    // associations can be defined here
    Store.belongsTo(models.Country, { foreignKey: 'countryId', as: 'country'});
    Store.belongsTo(models.City, { foreignKey: 'cityId', as: 'city'});
    Store.belongsTo(models.Area, { foreignKey: 'areaId', as: 'area'});
    
  };
  return Store;
};
