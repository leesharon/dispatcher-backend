import express from 'express'
import connect from './services/db.service'

const app = express()
const port = 3000

connect()

app.use(express.json())

// routes
import authRoutes from './api/auth/auth.routes'
import headlinesRoutes from './api/headlines/headlines.routes'

app.use('/api/auth', authRoutes)
app.use('/api/headlines', headlinesRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
})