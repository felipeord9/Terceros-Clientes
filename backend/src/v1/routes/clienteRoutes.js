const express = require('express')
const passport = require('passport')
const { checkRoles } = require('../../middlewares/authHandler')
const ClienteController = require('../../controllers/clienteController')

const router = express.Router()

router
    .get('/',ClienteController.findAllClientes)
    .post('/',ClienteController.createCliente)
    .get('/:id',ClienteController.findOneCliente)
    
module.exports = router