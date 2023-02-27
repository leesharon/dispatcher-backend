import express from 'express'
import authRoutes from './auth/auth.routes'
import headlineRoutes from './headlines/headlines.routes'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/headlines', headlineRoutes)

export default router