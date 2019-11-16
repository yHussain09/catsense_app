'use strict'
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    // organizationId: {
    //     field: 'organization_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'Organization',
    //         key: 'organization_id'
    //     }
    // },
    // productTypeId: {
    //   field: 'product_type_id',
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'ProductType',
    //     key: 'product_type_id'
    //   }
    // },
    productId: {
        field: 'product_id',
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
    quentity: {
      field: 'quentity',
      type: DataTypes.INTEGER
    },
    // measurementUnitId: {
    //   field: 'measurement_unit_id',
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'MeasurementUnit',
    //     key: 'measurement_unit_id'
    //   }
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
    tableName: 'product'
  })
  Product.associate = function (models) {
    // associations can be defined here
    Product.belongsTo(models.Organization, { foreignKey: 'organizationId', as: 'organization'})

    Product.belongsTo(models.ProductType, { foreignKey: 'productTypeId', as: 'productType'})

    Product.belongsTo(models.MeasurementUnit, { foreignKey: 'measurementUnitId', as: 'measurementUnit'})
    
  }
  return Product
}
