'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn(
        'Files',
        'status',
        Sequelize.STRING
      );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Files');
  }
};
