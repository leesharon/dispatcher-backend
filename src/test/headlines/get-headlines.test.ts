import request from 'supertest'
import app from './../../app'

`it('returns a 200 on successful get request', async () => {
    const cookie = await global.signup()
    const response = await request(app)
        .get('/api/headlines')
        .set('Cookie', cookie)
        .expect(200)
    expect(response.body).toHaveProperty('headlines')
})`

it('returns a 401 if the user is not authenticated', async () => {
    request(app)
        .get('/api/headlines')
        .expect(401)
})