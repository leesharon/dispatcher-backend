import request from 'supertest'
import app from './../../app'

it('returns a 201 on successful headline creation', async () => {
    const cookie = await global.login()
    return request(app)
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
})

it('returns a 401 if the user is not authenticated', async () => {
    return request(app)
        .post('/api/headlines')
        .send({
            itemData: {
                title: 'test',
                description: 'test',
                url: 'test',
                urlToImage: 'test',
                publishedAt: 'test',
                source: { 'id': 'strsssing', 'name': 'string' },
            }
        })
        .expect(401)
})

it('returns a 400 if the headline is invalid', async () => {
    const cookie = await global.login()
    return request(app)
        .post('/api/headlines')
        .set('Cookie', cookie)
        .send({
            itemData: {
                description: 'test',
                url: 'test',
                urlToImage: 'test',
                publishedAt: 'test',
                source: { 'id': 'strsssing', 'name': 'string' },
            }
        })
})

