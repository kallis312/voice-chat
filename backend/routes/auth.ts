import { login, signup, tokenLogin } from '@Ctr/authCtr'
import { Router } from 'express'
import passport from 'passport'

const requireAuth = passport.authenticate("jwt", { session: false })

const routes = Router()

routes.post('/login', login)
routes.post('/signup', signup)

routes.get('/token-login', requireAuth, tokenLogin)


module.exports = routes