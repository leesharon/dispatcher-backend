import request from 'supertest'
import app from './../../app'

it('should logout a user', async () => {
    const cookie = await global.login()

    const response = await request(app)
        .post('/api/auth/logout')
        .set('Cookie', cookie)
    expect(response.status).toEqual(204)
    expect(response.get('Set-Cookie')).toEqual(expect.arrayContaining([]))
    expect(response.get('Set-Cookie')[0]).toMatch(/accessToken=;/)
    expect(response.get('Set-Cookie')[1]).toMatch(/refreshToken=;/)
})

it('should not logout a user if not logged in', async () => {
    const response = await request(app)
        .post('/api/auth/logout')
    expect(response.status).toEqual(401)
})