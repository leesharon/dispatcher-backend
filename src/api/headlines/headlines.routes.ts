import { validateRequest } from './../../middlewares/validate-request'
import { Validator } from './../../middlewares/validator'
import express from 'express'
import { getHeadlines, getHeadlineById, addHeadline, updateHeadline, removeHeadline } from './headlines.controller'

const router = express.Router()

router.get('/', getHeadlines)
router.get('/:id', getHeadlineById)
router.post('/', Validator.validateHeadline(), validateRequest, addHeadline)
router.put('/:id', updateHeadline)
router.delete('/:id', removeHeadline)

export default router