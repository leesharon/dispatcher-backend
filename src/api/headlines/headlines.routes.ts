import express from 'express'
import { getHeadlines, getHeadlineById, addHeadline } from './headlines.controller'

const router = express.Router()

router.get('/', getHeadlines)
router.get('/:id', getHeadlineById)
router.post('/add', addHeadline)

export default router