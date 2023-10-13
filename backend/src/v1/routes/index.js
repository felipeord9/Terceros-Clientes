const express = require('express')
const UserRoutes = require('./userRoutes')
const MailRoutes = require('./mailRoutes')
const AuthRoutes = require('./authRoutes')

function routerApi(app) {
    const router = express.Router()

    app.use('/api/v1/', router)

    router.use('/auth', AuthRoutes)
    router.use('/users', UserRoutes)
    router.use('/mail', MailRoutes)
}

module.exports = routerApi