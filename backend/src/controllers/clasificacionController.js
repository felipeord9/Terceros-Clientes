const ClasificacionService = require('../services/clasificacionService')

const findAllClasificaciones = async (req, res, next) => {
  try {
    const data = await ClasificacionService.find()
    
    res.status(200).json({
      status: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllClasificaciones
}