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

const findOneCiudad =async (req, res, next)=>{
  try {
    const { params: { city } } = req;
    const data = await CiudadService.findByCodigo(city);

    res.status(200).json({
      message: 'OK',
      data,
    });
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllCiudades,
  findOneCiudad
}