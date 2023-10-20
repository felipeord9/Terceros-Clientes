const express = require('express')
const CiudadController = require('../../controllers/ciudadController')

const router = express.Router()

router.get('/', CiudadController.findAllCiudades)

module.exports = router