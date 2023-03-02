import app from './app'
import connect from './services/db.service'
import { isEnvVarsExist } from './utils/generalUtils'
import { morgan } from './logger'

if (process.env.NODE_ENV !== 'test') {
    connect()
    if (!isEnvVarsExist()) throw new Error('need to setup env variables')
    app.use(morgan.successHandler)
    app.use(morgan.errorHandler)
}

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server listening on port ${port}.`)
})

export default app