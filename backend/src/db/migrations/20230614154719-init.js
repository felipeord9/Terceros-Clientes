"use strict";
const { PRECIO_TABLE, PrecioSchema} = require('../models/preciosModel')
const { RESPONSABILIDAD_FISCAL_TABLE,ResponsabilidadFiscalSchema } =require('../models/responsabilidadFiscalModel')
const { REGIMEN_FISCAL_TABLE, RegimenFiscalSchema} = require('../models/regFiscalModel')
const { CLIENTE_TABLE, ClienteSchema } = require('../models/clienteModel');
const { DETALLE_TABLE, DetalleSchema} = require('../models/detalleModel');
const { DEPARTAMENTO_TABLE, DepartamentoSchema} = require('../models/departamentoModel');
const { CIUDAD_TABLE,CiudadSchema } =require('../models/ciudadModel')
const { DOCUMENT_TABLE, DocumentSchema } = require("../models/documentModel");
const { USER_TABLE, UserSchema} = require('../models/userModel')
const { AGENCY_TABLE, AgencySchema } = require("../models/agencyModel");
const { PROVEEDOR_TABLE, ProveedorSchema } = require('../models/proveedoresModel');
const { ACTIVIDAD_ECONOMICA_TABLE, ActividadEconomicaSchema} = require("../models/actividadModel")
const { CLASIFICACION_TABLE,ClasificacionSchema } = require('../models/clasificacionModel')
/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(ACTIVIDAD_ECONOMICA_TABLE,ActividadEconomicaSchema);
    await queryInterface.createTable(DEPARTAMENTO_TABLE,DepartamentoSchema);
    await queryInterface.createTable(CLIENTE_TABLE,ClienteSchema);
    await queryInterface.createTable(PRECIO_TABLE,PrecioSchema);
    await queryInterface.createTable(RESPONSABILIDAD_FISCAL_TABLE,ResponsabilidadFiscalSchema);
    await queryInterface.createTable(CIUDAD_TABLE,CiudadSchema);
    await queryInterface.createTable(DOCUMENT_TABLE,DocumentSchema);
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(PROVEEDOR_TABLE,ProveedorSchema);
    await queryInterface.createTable(DETALLE_TABLE,DetalleSchema);
    await queryInterface.createTable(REGIMEN_FISCAL_TABLE,RegimenFiscalSchema);
    await queryInterface.createTable(AGENCY_TABLE, AgencySchema);
    await queryInterface.createTable(CLASIFICACION_TABLE,ClasificacionSchema);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(DEPARTAMENTO_TABLE);
    await queryInterface.dropTable(DETALLE_TABLE);
    await queryInterface.dropTable(ACTIVIDAD_ECONOMICA_TABLE);
    await queryInterface.dropTable(CIUDAD_TABLE);
    await queryInterface.dropTable(PRECIO_TABLE);
    await queryInterface.dropTable(PROVEEDOR_TABLE);
    await queryInterface.dropTable(RESPONSABILIDAD_FISCAL_TABLE);
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(REGIMEN_FISCAL_TABLE);
    await queryInterface.dropTable(AGENCY_TABLE);
    await queryInterface.dropTable(CLASIFICACION_TABLE);
    await queryInterface.dropTable(DOCUMENT_TABLE);
    await queryInterface.dropTable(CLIENTE_TABLE);
  },
};
