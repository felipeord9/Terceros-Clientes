const express = require('express')
const ClasificacionController = require('../../controllers/clasificacionController')

const router = express.Router()

router.get('/', ClasificacionController.findAllClasificaciones)

module.exports = router