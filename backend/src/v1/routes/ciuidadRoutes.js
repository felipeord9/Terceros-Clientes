const express = require('express')
const CiudadController = require('../../controllers/ciudadController')

const router = express.Router()

router.get('/', CiudadController.findAllCiudades)
      .get('/:city',CiudadController.findOneCiudad)

module.exports = router