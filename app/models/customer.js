'use strict'
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    customerId: {
      field: 'customer_id',
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    // customerTypeId: {
    //     field: 'customer_type_id',
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //       model: 'CustomerType',
    //       key: 'customer_type_id'
    //     }
    //   },
    firstName: {
      field: 'first_name',
      type: DataTypes.STRING(100)
    },
    middleName: {
        field: 'middle_name',
        type: DataTypes.STRING(100)
    },
    lastName: {
        field: 'last_name',
        type: DataTypes.STRING(100)
    },
    age: {
      field: 'age',
      type: DataTypes.INTEGER
    },
    gender: {
      field: 'gender',
      type: DataTypes.STRING(1)
    },
    contactNum: {
      field: 'contact_num',
      type: DataTypes.STRING(15)
    },
    email: {
      field: 'email',
      type: DataTypes.STRING(255)
    },
    nic: {
      field: 'nic',
      type: DataTypes.STRING(16)
    },
    address: {
      field: 'address',
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
    tableName: 'customer'
  })
  Customer.associate = function (models) {
    // associations can be defined here
    Customer.belongsTo(models.CustomerType, { foreignKey: 'customerTypeId', as: 'customerType'})
    
  }
  return Customer
}
