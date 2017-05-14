'use strict';
const DataTypes = require('sequelize').DataTypes;

const personDao = {
  url:{
    type: DataTypes.STRING(511),
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(127)
  },
  company: {
    type: DataTypes.STRING(127)
  },
  role: {
    type: DataTypes.STRING(127)
  },
  time: {
    type: DataTypes.STRING(63)
  },
  local: {
    type: DataTypes.STRING(63)
  }
};


//// Export //////
module.exports = (sequelize) => {
  return sequelize.define(
    'person',
    personDao,
    {
      timestamps: false,
      underscored: true
    }
  );
};