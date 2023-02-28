import { validateRequest } from './../../middlewares/validate-request'
import { Validator } from './../../middlewares/validator'
import express from 'express'
import { getHeadlines, getHeadlineById, addHeadline, updateHeadline, removeHeadline } from './headlines.controller'
import { authenticateToken } from '../../middlewares/authenticate-token'

const router = express.Router()

router.get('/', getHeadlines)
router.get('/:id', getHeadlineById)
router.post('/', authenticateToken, Validator.validateHeadline(), validateRequest, addHeadline)
router.put('/:id', updateHeadline)
router.delete('/:id', removeHeadline)

export default router