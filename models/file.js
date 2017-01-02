'use strict';
module.exports = function(sequelize, DataTypes) {
  var File = sequelize.define('File', {
    description: DataTypes.STRING,
    tags: DataTypes.STRING,
    filename: DataTypes.STRING,
    filetype: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return File;
};