import express from 'express'
import { getHeadlines, getHeadlineById, addHeadline, updateHeadline } from './headlines.controller'

const router = express.Router()

router.get('/', getHeadlines)
router.get('/:id', getHeadlineById)
router.post('/', addHeadline)
router.post('/:id', updateHeadline)

export default router