const express = require('express')
const UserRoutes = require('./userRoutes')
const CiudadRoutes = require('./ciuidadRoutes')
const MailRoutes = require('./mailRoutes')
const AuthRoutes = require('./authRoutes')
const DepartamentoRoutes= require('./departamentoRoutes')
const AgencyRoutes = require('./agencyRoutes')
const ClasificacionRoutes = require('./clasificacionRoute')
const DocumentRoutes = require('./documentRoutes')
const ClienteNaturalRoutes = require('./clienteNaturalRoutes')

function routerApi(app) {
    const router = express.Router()

    app.use('/api/v1/', router)

    router.use('/auth', AuthRoutes)
    router.use('/users', UserRoutes)
    router.use('/mail', MailRoutes)
    router.use('/ciudades',CiudadRoutes )
    router.use('/departamentos',DepartamentoRoutes )
    router.use('/documents',DocumentRoutes)
    router.use('/agencies', AgencyRoutes)
    router.use('/clienteNatural',ClienteNaturalRoutes)
    router.use('/clasificacion',ClasificacionRoutes)}

module.exports = routerApi