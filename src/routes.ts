import { Router } from 'express'
import SurveysController from './controllers/SurveysController'
import UserController from './controllers/UserController'
import SendMailController from './controllers/SendMailController'

const router = Router() 

router.post('/users', UserController.create)
router.get('/users', UserController.show)

router.post('/surveys', SurveysController.create)
router.get('/surveys', SurveysController.show)

router.post('/sendmail', SendMailController.execute)

export { router }