const { models } = require('../libs/sequelize')

const find = () => {
  const precios = models.precio.findAll()
  return precios
}

module.exports = {
  find
}