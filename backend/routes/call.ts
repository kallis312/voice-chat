import { createCall, enterRoom } from '@Ctr/callCtr'
import { Router } from 'express'
import passport from 'passport'

const requireAuth = passport.authenticate("jwt", { session: false })

const routes = Router()

routes.post('/create-room', requireAuth, createCall)
routes.post('/enter-room/:id', requireAuth, enterRoom)

module.exports = routes