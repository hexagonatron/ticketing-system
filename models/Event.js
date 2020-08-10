'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      Event.belongsTo(models.User, {
        foreignKey: {
          field: 'created_by'
        },
        as: 'creator'
      })

      Event.belongsToMany(models.User, {
        through: 'EventAdmins',
        as: 'event_admins'
      })

      Event.hasMany(models.Ticket, {
        foreignKey: {
          field: 'event_id'
        },
        as: 'tickets'
      })

      Event.hasMany(models.Market, {
        foreignKey: {
          field: 'event_id'
        },
        as: 'listings'
      })

    }
  };
  Event.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING(10000),
    },
    price: {
      type: DataTypes.INTEGER,
    },
    sale_date: {
      type: DataTypes.DATE,
    },
    start_date: {
      type: DataTypes.DATE,
    },
    capacity: {
      type: DataTypes.STRING,
    },
    venue_name: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING(1000),
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    sold_out: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};