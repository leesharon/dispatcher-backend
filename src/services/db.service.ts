import mongoose, { ConnectOptions } from 'mongoose'

const connect = async () => {
    const DB_URL = process.env.DB_URL
    if (mongoose.connection.readyState === 1) return
    if (!DB_URL) throw new Error('DB_URL is not defined.')
    try {
        await mongoose.connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions)
        console.log('Connected to database')
    } catch (err) {
        console.error(err)
    }
}

mongoose.set('strictQuery', false)

export default connect
