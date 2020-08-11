require("dotenv").config()

module.exports = {
  
  "development": {
    "username": process.env.DBUSER,
    "password": process.env.DBPASSWORD,
    "database": process.env.DBNAME,
    "host": process.env.DBHOST,
    "dialect": "mysql",
    "port": process.env.DBPORT,
    "logging": false
  },
  "test": {
    "username": process.env.DBUSER,
    "password": process.env.DBPASSWORD,
    "database": process.env.DBNAME,
    "host": process.env.DBHOST,
    "dialect": "mysql",
    "port": process.env.DBPORT,
    "logging": false
  },
  "production": {
    "username": process.env.DBUSER,
    "password": process.env.DBPASSWORD,
    "database": process.env.DBNAME,
    "host": process.env.DBHOST,
    "dialect": "mysql",
    "port": process.env.DBPORT,
    "logging": true
  }
}
