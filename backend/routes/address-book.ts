import { addAddressBook, deletedAddressBook, updateAddressBook, getAddressBookUsers } from '@Ctr/addressBookCtr'
import { Router } from 'express'
import passport from 'passport'

const requireAuth = passport.authenticate("jwt", { session: false })

const routes = Router()

routes.post('/add-user', requireAuth, addAddressBook)
routes.put('/add-user/:id', requireAuth, updateAddressBook)
routes.delete('/add-user/:id', requireAuth, deletedAddressBook)
routes.get('/users', requireAuth, getAddressBookUsers)

module.exports = routes