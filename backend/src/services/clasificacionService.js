const { models } = require('../libs/sequelize')

const find = async() => {
  const clasificacion = await models.clasificacion.findAll()
  return clasificacion
}

module.exports = {
  find
}