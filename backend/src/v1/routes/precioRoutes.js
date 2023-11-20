const express = require('express')
const PrecioController = require('../../controllers/precioController')

const router = express.Router()

router.get('/', PrecioController.findAllPrecios)

module.exports = router