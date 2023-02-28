import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import apiRoutes from './api/api.routes'
import { NotFoundError } from './errors/not-found-error'
import { errorHandler } from './middlewares/error-handler'
import connect from './services/db.service'

const app = express()
const port = 3000

connect()

app.use(express.json())

app.use('/api', apiRoutes)

app.all('*', async (req, res) => {
    throw new NotFoundError()
})

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
})