import mongoose, { ConnectOptions } from 'mongoose'

const DB_URL = 'mongodb+srv://lees:89c5pb7d8kUQFUjy@dispatcher.qksharh.mongodb.net/test'

const connect = async () => {
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
