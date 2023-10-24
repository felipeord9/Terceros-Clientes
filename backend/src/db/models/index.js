const { Agency, AgencySchema } = require('./agencyModel')
const { User, UserSchema } = require('./userModel')
const { Clasificacion, ClasificacionSchema } = require('./clasificacionModel')
const { Document, DocumentSchema } = require('./documentModel')
const { Ciudad, CiudadSchema} = require('./ciudadModel')
const { Departamento,DepartamentoSchema } = require('./departamentoModel')
const { ClienteNatural, ClienteNaturalSchema } =require('./clienteNaturalModel')

function setupModels(sequelize) {
  Departamento.init(DepartamentoSchema, Departamento.config(sequelize))
  User.init(UserSchema, User.config(sequelize))
  Agency.init(AgencySchema,Agency.config(sequelize))
  Clasificacion.init(ClasificacionSchema,Clasificacion.config(sequelize))
  Document.init(DocumentSchema,Document.config(sequelize))
  Ciudad.init(CiudadSchema,Ciudad.config(sequelize))
  ClienteNatural.init(ClienteNaturalSchema,ClienteNatural.config(sequelize))


  User.associate(sequelize.models)
  Departamento.associate(sequelize.models)
  Agency.associate(sequelize.models)
  Clasificacion.associate(sequelize.models)
  Document.associate(sequelize.models)
  Ciudad.associate(sequelize.models)
  ClienteNatural.associate(sequelize.models)
}
module.exports = setupModels