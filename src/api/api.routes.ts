import express from 'express'
import authRoutes from './auth/auth.routes'
import headlineRoutes from './headlines/headlines.routes'
import { authenticateToken } from './../middlewares/authenticate-token'
import HeadlinesController from './headlines/headlines-class-controller'

const headlinesController = new HeadlinesController()

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/headlines', authenticateToken, headlinesController.router)

export default router