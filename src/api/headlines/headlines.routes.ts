import { validateRequest } from './../../middlewares/validate-request'
import { Validator } from './../../middlewares/validator'
import express from 'express'
import { getHeadlines, getHeadlineById, addHeadline, updateHeadline, removeHeadline } from './headlines.controller'
import { authenticateToken } from '../../middlewares/authenticate-token'

const router = express.Router()

router.get('/', authenticateToken, getHeadlines)
router.get('/:id', authenticateToken, getHeadlineById)
router.post('/', authenticateToken, Validator.validateHeadline(), validateRequest, addHeadline)
router.put('/:id', authenticateToken, updateHeadline)
router.delete('/:id', authenticateToken, removeHeadline)

export default router