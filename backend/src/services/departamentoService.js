const { models } = require('../libs/sequelize')

const find = () => {
  const departamento = models.departamento.findAll()
  return departamento
}

module.exports = {
  find
}