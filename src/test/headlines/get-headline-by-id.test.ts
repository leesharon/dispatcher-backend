import request from 'supertest'
import app from './../../app'

it('returns a 404 if the headline is not found', async () => {
    const cookie = await global.login()
    await request(app)
        .get('/api/headlines/5f4b2c0b1a2a8a2c9c9e2b2a')
        .set('Cookie', cookie)
        .send()
        .expect(404)
})

it('returns the headline if the headline is found', async () => {
    const cookie = await global.login()
    const response = await request(app)
        .post('/api/headlines')
        .set('Cookie', cookie)
        .send({
            itemData: {
                title: 'test',
                description: 'test',
                url: 'test',
                urlToImage: 'test',
                publishedAt: 'test',
                source: { 'id': 'strsssing', 'name': 'string' },
                author: 'test',
                content: 'test'
            }
        })
        .expect(201)

    await request(app)
        .get(`/api/headlines/${response.body.addedItem._id}`)
        .set('Cookie', cookie)
        .send()
        .expect(200)
})

it('returns a 401 if the user is not authenticated', async () => {
    await request(app)
        .get('/api/headlines/5f4b2c0b1a2a8a2c9c9e2b2a')
        .send()
        .expect(401)
})