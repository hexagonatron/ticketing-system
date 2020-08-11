'use strict';

const bcrypt = require('bcrypt');

const { Model } = require('sequelize');

//Returns the hash of the inputed password
const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return reject(err);

      return resolve(hash);
    })
  })
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Event, {
        through: 'EventAdmins',
        as: 'admin_events'
      })

      User.hasMany(models.Event, {
        foreignKey: {
          field: 'created_by'
        },
        as: 'created_events'
      })

      User.hasMany(models.Ticket, {
        foreignKey: {
          field: 'owner_id'
        },
        as: 'tickets'
      })

      User.hasMany(models.Transaction, {
        foreignKey: {
          field: 'user_id'
        },
        as: 'transactions'
      })

      User.hasMany(models.Market, {
        foreignKey: {
          field: 'lister_id'
        },
        as: 'listings'
      })

    }
  };

  User.init({
    id: {
      type: DataTypes.STRING,
      required: true,
      primaryKey: true,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING
    },
    last_name: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    dob: {
      type: DataTypes.DATEONLY
    },
    is_event_creator: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_event_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user"
    },
  },
  {
    sequelize,
    modelName: 'User',
  });

  User.addHook("beforeCreate", async function (user, options) {
    user.password = await hashPassword(user.password);
  });

  User.addHook("beforeBulkUpdate", async function (user, options) {
    user.password = await hashPassword(user.password);
  });

  return User;
};