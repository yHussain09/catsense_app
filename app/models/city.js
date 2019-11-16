'use strict'
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    // countryId: {
    //     field: 'country_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Country',
    //         key: 'country_id'
    //       }
    // },
    cityId: {
      field: 'city_id',
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
    tableName: 'city'
  })
  City.associate = function (models) {
    // associations can be defined here
    City.belongsTo(models.Country, { foreignKey: 'countryId', as: 'country'})
  }
  return City
}
