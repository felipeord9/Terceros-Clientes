const CiudadService = require('../services/ciudadService')

const findAllCiudades = async (req, res, next) => {
  try {
    const data = await CiudadService.find()
    res.status(200).json({
      status: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllCiudades
}