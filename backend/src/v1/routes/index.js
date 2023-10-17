const express = require('express')
const UserRoutes = require('./userRoutes')
const MailRoutes = require('./mailRoutes')
const AuthRoutes = require('./authRoutes')
const AgencyRoutes = require('./agencyRoutes')
const ClasificacionRoutes = require('./clasificacionRoute')

function routerApi(app) {
    const router = express.Router()

    app.use('/api/v1/', router)

    router.use('/auth', AuthRoutes)
    router.use('/users', UserRoutes)
    router.use('/mail', MailRoutes)
    router.use('/agencies', AgencyRoutes)
    router.use('/clasificaciones',ClasificacionRoutes)}

module.exports = routerApi