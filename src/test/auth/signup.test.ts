import request from 'supertest'
import app from './../../app'

it('should signup a user', async () => {
    const response = await request(app)
        .post('/api/auth/signup')
        .send({
            user: {
                email: 'test@test3.com',
                password: 'Lol123123123'
            }
        })
    expect(response.status).toEqual(201)
    expect(response.headers['set-cookie']).toEqual(expect.arrayContaining([
        expect.stringContaining('accessToken='),
        expect.stringContaining('refreshToken=')
    ]))
    expect(response.body).toHaveProperty('user')
    expect(response.body.user).toHaveProperty('_id')
    expect(response.body.user).toHaveProperty('email')
    expect(response.body.user).not.toHaveProperty('password')
})

it('should not signup a user with invalid email', async () => {
    const response = await request(app)
        .post('/api/auth/signup')
        .send({
            user: {
                email: 'test1',
                password: 'Lol123123123'
            }
        })
    expect(response.status).toEqual(400)
})

it('should not signup a user with invalid password', async () => {
    const response = await request(app)
        .post('/api/auth/signup')
        .send({
            user: {
                email: 'test@test2.comm',
                password: 'Lol123'
            }
        })
    expect(response.status).toEqual(400)
})

it('should not signup a user with email already in use', async () => {
    const email = 'l@l.com'
    const password = 'Lol123123123'

    const response = await request(app)
        .post('/api/auth/signup')
        .send({
            user: {
                email,
                password
            }
        })
    expect(response.status).toEqual(400)
})







