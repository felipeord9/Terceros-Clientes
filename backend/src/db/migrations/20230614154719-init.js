"use strict";
const { USER_TABLE, UserSchema} = require('../models/userModel')
const { AGENCY_TABLE, AgencySchema } = require("../models/agencyModel");
const { CLASIFICACION_TABLE,ClasificacionSchema } = require('../models/clasificacionModel')
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(AGENCY_TABLE, AgencySchema);
    await queryInterface.createTable(CLASIFICACION_TABLE,ClasificacionSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(AGENCY_TABLE);
    await queryInterface.dropTable(CLASIFICACION_TABLE);
  },
};
