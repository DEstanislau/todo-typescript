import { Router } from 'express'

import UserController from '../Controllers/UserController'

import ValidationUserStore from '../Validators/UserStore'

const routes = Router()

routes.get('/:id', UserController.show)
routes.get('/', UserController.index)

routes.post('/', ValidationUserStore, UserController.store)

routes.put('/:id', UserController.update)

export default routes
