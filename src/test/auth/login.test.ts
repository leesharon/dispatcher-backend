import request from 'supertest'
import app from './../../app'

it('should log in a user', async () => {
    const cookie = await global.signup()

    const response = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'l@l.com',
            password: 'Lol123123123',
        })
    expect(response.status).toEqual(200)
    expect(response.headers['set-cookie']).toEqual(expect.arrayContaining([
        expect.stringContaining('accessToken='),
        expect.stringContaining('refreshToken=')
    ]))
})

it('should not log in a user with invalid credentials', async () => {
    const response = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'test',
            password: 'Password123',
        })
    expect(response.status).toEqual(400)
})

it('should not log in a user with invalid password', async () => {
    const response = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'test@test.com',
            password: 'Password123',
        })
    expect(response.status).toEqual(400)
})

it('should not log in a user with invalid email', async () => {
    const response = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'test',
            password: 'Password123123123',
        })
    expect(response.status).toEqual(400)
})

