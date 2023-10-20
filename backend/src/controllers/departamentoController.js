const DepartamentoService = require('../services/departamentoService')

const findAllDepartamentos = async (req, res, next) => {
  try {
    const data = await DepartamentoService.find()
    res.status(200).json({
      status: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllDepartamentos
}