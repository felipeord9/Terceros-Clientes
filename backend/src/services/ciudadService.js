const { models } = require('../libs/sequelize')

const find = () => {
  const ciudades = models.ciudades.findAll()
  return ciudades
}

module.exports = {
  find
}