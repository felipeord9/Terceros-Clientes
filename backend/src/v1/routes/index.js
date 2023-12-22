const express = require('express')
const UserRoutes = require('./userRoutes')
const BitacoraRoutes = require('./bitacoraRoutes')
const CiudadRoutes = require('./ciuidadRoutes')
const ResponsabilidadRoutes = require('./responsabilidadRoutes')
const MailRoutes = require('./mailRoutes')
const AuthRoutes = require('./authRoutes')
const FileRoutes = require('./fileRoutes')
const ActividadRoutes = require('./actividadRoutes')
const ClienteRoutes = require('./clienteRoutes')
const DetalleRoutes = require('./detalleRoutes')
const RegimenRoutes = require('./regimenRoutes')
const PrecioRoutes = require('./precioRoutes')
const DepartamentoRoutes= require('./departamentoRoutes')
const AgencyRoutes = require('./agencyRoutes')
const ProveedorRoutes = require('./proveedorRoutes')
const ClasificacionRoutes = require('./clasificacionRoute')
const DocumentRoutes = require('./documentRoutes')
const SucursalRoutes = require('./sucursalRoutes')

function routerApi(app) {
    const router = express.Router()

    app.use('/api/v1/', router)

    router.use('/auth', AuthRoutes)
    router.use('/users', UserRoutes)
    router.use('/bitacora',BitacoraRoutes)
    router.use('/proveedor',ProveedorRoutes)
    router.use('/mail', MailRoutes)
    router.use('/actividad',ActividadRoutes)
    router.use('/responsabilidad',ResponsabilidadRoutes)
    router.use('/ciudades',CiudadRoutes )
    router.use('/departamentos',DepartamentoRoutes )
    router.use('/documents',DocumentRoutes)
    router.use('/precios',PrecioRoutes)
    router.use('/agencies', AgencyRoutes)

    router.use('/uploadMultiple',FileRoutes)

    router.use('/regimen',RegimenRoutes)
    router.use('/sucursales',SucursalRoutes)
    router.use('/clientes',ClienteRoutes)
    router.use('/detalles',DetalleRoutes)
    router.use('/clasificacion',ClasificacionRoutes)}

module.exports = routerApi