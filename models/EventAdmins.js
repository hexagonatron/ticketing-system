'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventAdmins extends Model {
    
    static associate(models) {
      // define association here
    }
  };
  EventAdmins.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    role: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'EventAdmins',
  });
  return EventAdmins;
};