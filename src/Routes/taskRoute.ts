import { Router } from 'express'

import TaskController from '../Controllers/TaskController'

import ValidationTaskStore from '../Validators/TaskStore'

const routes = Router()

routes.get('/:id', TaskController.show)

routes.post('/', ValidationTaskStore, TaskController.store)

export default routes
