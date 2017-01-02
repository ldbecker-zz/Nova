'use strict';
module.exports = function(sequelize, DataTypes) {
  var FileMeta = sequelize.define('FileMeta', {
    linecount: DataTypes.INTEGER,
    filesize: DataTypes.INTEGER,
    fileid: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return FileMeta;
};