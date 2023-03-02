import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import app from '../app'

declare global {
    function login(): Promise<string[]>;
}

let mongo: MongoMemoryServer

beforeAll(async () => {
    process.env.JWT_ACCESS_SECRET = 'asdfasdf'
    process.env.JWT_REFRESH_SECRET = 'kaskfdnasfkn'
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

    mongo = await MongoMemoryServer.create()
    const mongoUri = mongo.getUri()

    mongoose.set('strictQuery', false)
    await mongoose.connect(mongoUri, {})
})

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (const collection of collections) {
        await collection.deleteMany({})
    }

    // setup a user
    const email = 'l@l.com'
    const password = 'Lol123123123'
    await request(app)
        .post('/api/auth/signup')
        .send({
            user: {
                email,
                password,
            }
        })
        .expect(201)
})

afterAll(async () => {
    if (mongo) await mongo.stop()
    await mongoose.connection.close()
})

global.login = async () => {
    const email = 'l@l.com'
    const password = 'Lol123123123'

    const response = await request(app)
        .post('/api/auth/login')
        .send({
            user: {
                email,
                password,
            }
        })
        .expect(200)

    const cookie = response.get('Set-Cookie')

    return cookie
}
