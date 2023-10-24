"use strict";
const { CLIENTE_NATURAL_TABLE, ClienteNaturalSchema } = require('../models/clienteNaturalModel');
const { DEPARTAMENTO_TABLE, DepartamentoSchema} = require('../models/departamentoModel');
const { CIUDAD_TABLE,CiudadSchema } =require('../models/ciudadModel')
const { DOCUMENT_TABLE, DocumentSchema } = require("../models/documentModel");
const { USER_TABLE, UserSchema} = require('../models/userModel')
const { AGENCY_TABLE, AgencySchema } = require("../models/agencyModel");
const { CLASIFICACION_TABLE,ClasificacionSchema } = require('../models/clasificacionModel')
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(CLIENTE_NATURAL_TABLE,ClienteNaturalSchema);
    await queryInterface.createTable(DEPARTAMENTO_TABLE,DepartamentoSchema);
    await queryInterface.createTable(CIUDAD_TABLE,CiudadSchema);
    await queryInterface.createTable(DOCUMENT_TABLE,DocumentSchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(AGENCY_TABLE, AgencySchema);
    await queryInterface.createTable(CLASIFICACION_TABLE,ClasificacionSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DEPARTAMENTO_TABLE);
    await queryInterface.dropTable(CIUDAD_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(AGENCY_TABLE);
    await queryInterface.dropTable(CLASIFICACION_TABLE);
    await queryInterface.dropTable(DOCUMENT_TABLE);
    await queryInterface.dropTable(CLIENTE_NATURAL_TABLE);
  },
};
