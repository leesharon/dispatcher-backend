import { authenticateToken } from './../../middlewares/authenticate-token'
import { validateRequest } from './../../middlewares/validate-request'
import express from 'express'
import { login, logout, signup } from './auth.controller'
import { Validator } from '../../middlewares/validator'

const router = express.Router()

router.post('/login', Validator.validateAuth(), validateRequest, login)
router.post('/signup', Validator.validateAuth(), validateRequest, signup)
router.post('/logout', authenticateToken, logout)

export default router