import * as dotenv from 'dotenv'
dotenv.config()

import express, { Express } from 'express'
import { json } from 'body-parser'
import cookieParser from 'cookie-parser'
import apiRoutes from './api/api.routes'
import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'
import connect from './services/db.service'
import { isEnvVarsExist } from './utils/generalUtils'
import { morgan } from './logger'

const app = express()

const setUpMiddleware = (app: Express) => {
    if (process.env.NODE_ENV !== 'test') {
        connect()
        if (!isEnvVarsExist()) throw new Error('need to setup env variables')
        app.use(morgan.successHandler)
        app.use(morgan.errorHandler)
    }
    app.use(json())
    app.use(cookieParser())
}

const setUpRoutes = (app: Express) => {
    app.use('/api', apiRoutes)
}

const setUpErrorHandling = (app: Express) => {
    app.all('*', async () => {
        throw new NotFoundError()
    })
    app.use(errorHandler)
}

setUpMiddleware(app)
setUpRoutes(app)
setUpErrorHandling(app)

export default app