'use strict';
const { PRE_APROVACION_TABLE,PreAprovacionSchema } = require('../models/preAprovacionModel')
const { CLIENTE_TABLE, ClienteSchema } = require('../models/clienteModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(PRE_APROVACION_TABLE,PreAprovacionSchema);
    await queryInterface.createTable(CLIENTE_TABLE,ClienteSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(PRE_APROVACION_TABLE);
    await queryInterface.dropTable(CLIENTE_TABLE);

  }
};
