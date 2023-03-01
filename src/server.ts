import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { json } from 'body-parser'
import cookieParser from 'cookie-parser'
import apiRoutes from './api/api.routes'
import { NotFoundError } from './errors/not-found-error'
import { morgan } from './logger'
import { errorHandler } from './middlewares/error-handler'
import connect from './services/db.service'
import { isEnvVarsExist } from './utils/generalUtils'

const app = express()

if (process.env.NODE_ENV !== 'test') {
    if (!isEnvVarsExist()) throw new Error('need to setup env variables')
    app.use(morgan.successHandler)
    app.use(morgan.errorHandler)
}

connect()

app.use(json())

app.use(cookieParser())

app.use('/api', apiRoutes)

app.all('*', async (req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
})

export default app