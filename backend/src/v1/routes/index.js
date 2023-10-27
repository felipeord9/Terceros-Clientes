const express = require('express')
const UserRoutes = require('./userRoutes')
const CiudadRoutes = require('./ciuidadRoutes')
const ResponsabilidadRoutes = require('./responsabilidadRoutes')
const MailRoutes = require('./mailRoutes')
const AuthRoutes = require('./authRoutes')
const ClienteRoutes = require('./clienteRoutes')
const DetalleRoutes = require('./detalleRoutes')
const RegimenRoutes = require('./regimenRoutes')
const DepartamentoRoutes= require('./departamentoRoutes')
const AgencyRoutes = require('./agencyRoutes')
const ClasificacionRoutes = require('./clasificacionRoute')
const DocumentRoutes = require('./documentRoutes')

function routerApi(app) {
    const router = express.Router()

    app.use('/api/v1/', router)

    router.use('/auth', AuthRoutes)
    router.use('/users', UserRoutes)
    router.use('/mail', MailRoutes)
    router.use('/responsabilidad',ResponsabilidadRoutes)
    router.use('/ciudades',CiudadRoutes )
    router.use('/departamentos',DepartamentoRoutes )
    router.use('/documents',DocumentRoutes)
    router.use('/agencies', AgencyRoutes)
    router.use('/regimen',RegimenRoutes)
    router.use('/clientes',ClienteRoutes)
    router.use('/detalles',DetalleRoutes)
    router.use('/clasificacion',ClasificacionRoutes)}

module.exports = routerApi