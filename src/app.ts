import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { json } from 'body-parser'
import cookieParser from 'cookie-parser'
import apiRoutes from './api/api.routes'
import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'

const app = express()


app.use(json())

app.use(cookieParser())

app.use('/api', apiRoutes)

app.all('*', async (req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

export default app