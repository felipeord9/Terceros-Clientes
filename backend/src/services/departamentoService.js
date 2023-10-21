const { models } = require('../libs/sequelize')

const find = () => {
  const departamentos = models.departamentos.findAll()
  return departamentos
}

module.exports = {
  find
}