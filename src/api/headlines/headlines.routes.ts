import express from 'express'
import { getHeadlines } from './headlines.controller'

const router = express.Router()

router.get('/', getHeadlines)

export default router