import express from 'express'
import { getHeadlines, getHeadlineById } from './headlines.controller'

const router = express.Router()

router.get('/', getHeadlines)
router.get('/:id', getHeadlineById)


export default router