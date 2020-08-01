'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Market extends Model {
    static associate(models) {
      Market.belongsTo(models.Ticket, {
        foreignKey: {
          field: "ticket_id",
        },
        as: "ticket"
      })
    }
  };
  Market.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
      primaryKey: true
    },
    list_price: {
      type: DataTypes.INTEGER
    },
    list_date: {
      type: DataTypes.DATE
    },
    active: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Market',
  });
  return Market;
};