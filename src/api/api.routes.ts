import express from 'express'
import authRoutes from './auth/auth.routes'
import headlineRoutes from './headlines/headlines.routes'
import { authenticateToken } from './../middlewares/authenticate-token'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/headlines', authenticateToken, headlineRoutes)

export default router