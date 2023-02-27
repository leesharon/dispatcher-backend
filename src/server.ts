import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import apiRoutes from './api/api.routes'
import connect from './services/db.service'

const app = express()
const port = 3000

connect()

app.use(express.json())

// routes
app.use('/api', apiRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
})