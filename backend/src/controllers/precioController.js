const PrecioService = require('../services/precioService')

const findAllPrecios = async (req, res, next) => {
  try {
    const data = await PrecioService.find()
    
    res.status(200).json({
      status: 'OK',
      data
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findAllPrecios
}