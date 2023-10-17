const { models } = require('../libs/sequelize')

const find = () => {
  const clasificacion = models.clasificacion.findAll()
  return clasificacion
}

module.exports = {
  find
}