'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: {
          field: 'user_id'
        },
        as: 'user'
      })
    }
  };
  Transaction.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(1000)
    },
    value: {
      type: DataTypes.INTEGER
    },
    timestamp: {
      type: DataTypes.DATE
    },
    running_total: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};