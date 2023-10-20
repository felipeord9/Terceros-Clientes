const express = require('express')
const DepartamentoController = require('../../controllers/departamentoController')

const router = express.Router()

router.get('/', DepartamentoController.findAllDepartamentos)

module.exports = router