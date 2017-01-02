'use strict';
module.exports = function(sequelize, DataTypes) {
  var FileMeta = sequelize.define('FileMeta', {
    linecount: DataTypes.INT,
    filesize: DataTypes.INT,
    fileid: DataTypes.INT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return FileMeta;
};