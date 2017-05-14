"use strict";

const
  Sequelize = require("sequelize"),
  sequelize = new Sequelize(
  'database', '', '', {
    dialect: 'sqlite',
    storage: __dirname + '/../datas.sqlite3'
  });

const
  personDao = sequelize.import('./personDao');

module.exports = {
  sequelize,
  personDao
}