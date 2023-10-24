const express = require('express')
const passport = require('passport')
const { checkRoles } = require('../../middlewares/authHandler')
const ClienteNaturalController = require('../../controllers/clienteNaturalController')

const router = express.Router()

router
    .get('/',ClienteNaturalController.findAllClientesNaturales)
    .post('/',ClienteNaturalController.createClienteNatural)
    .get('/:id',ClienteNaturalController.findOneClienteNatural)
    
module.exports = router