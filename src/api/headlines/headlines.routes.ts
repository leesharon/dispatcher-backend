import { Validator } from './../../middlewares/validator'
import express from 'express'
import { getHeadlines, getHeadlineById, addHeadline, updateHeadline, removeHeadline } from './headlines.controller'

const router = express.Router()

router.get('/', getHeadlines)
router.get('/:id', getHeadlineById)
router.post('/', addHeadline)
router.post('/:id', Validator.validateHeadline, updateHeadline)
router.delete('/:id', removeHeadline)

export default router