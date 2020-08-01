'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {

    static associate(models) {
      Ticket.belongsTo(models.User, {
        foreignKey: {
          field: 'owner_id'
        },
        as:  'owner'
      })

      Ticket.hasMany(models.Market, {
        foreignKey: {
          field: 'ticket_id'
        },
        as: 'market'
      })

      Ticket.belongsTo(models.Event, {
        foreignKey: {
          field: 'event_id'
        },
        as: 'event'
      })
    }
  };
  Ticket.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    },
    secret_key: {
      type: DataTypes.STRING
    },
    checked_in: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    checked_in_date: {
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};