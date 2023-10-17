const { Agency, AgencySchema } = require('./agencyModel')
const { User, UserSchema } = require('./userModel')
const { Clasificacion, ClasificacionSchema } = require('./clasificacionModel')

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize))
  Agency.init(AgencySchema,Agency.config(sequelize))
  Clasificacion.init(ClasificacionSchema,Clasificacion.config(sequelize))

  User.associate(sequelize.models)
  Agency.associate(sequelize.models)
  Clasificacion.associate(sequelize.models)
}

module.exports = setupModels