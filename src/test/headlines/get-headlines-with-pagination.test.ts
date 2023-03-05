import request from 'supertest'
import app from './../../app'

it('returns a 200 on successful get request', async () => {
    const cookie = await global.login()
    await request(app)
        .get('/api/headlines/pagination')
        .set('Cookie', cookie)
        .expect(200)
})

it('returns a 401 if the user is not authenticated', async () => {
    request(app)
        .get('/api/headlines/pagination')
        .expect(401)
})

it('returns a 400 if the itemsPerPage is greater than 100', async () => {
    const cookie = await global.login()
    await request(app)
        .get('/api/headlines/pagination?itemsPerPage=101')
        .set('Cookie', cookie)
        .expect(400)
})

it('returns a 200 if the page is greater than the total number of pages', async () => {
    const cookie = await global.login()
    await request(app)
        .get('/api/headlines/pagination?page=1000')
        .set('Cookie', cookie)
        .expect(200)
})

it('returns a 200 if the itemsPerPage is greater than the total number of items', async () => {
    const cookie = await global.login()
    await request(app)
        .get('/api/headlines/pagination?itemsPerPage=90')
        .set('Cookie', cookie)
        .expect(200)
})

it('returns a 200 if the page is equal to the total number of pages', async () => {
    const cookie = await global.login()
    await request(app)
        .get('/api/headlines/pagination?page=1')
        .set('Cookie', cookie)
        .expect(200)
})

it('returns a 200 if the itemsPerPage is equal to the total number of items', async () => {
    const cookie = await global.login()
    await request(app)
        .get('/api/headlines/pagination?itemsPerPage=1')
        .set('Cookie', cookie)
        .expect(200)

})

it('returns a 200 if the page is less than the total number of pages', async () => {
    const cookie = await global.login()
    await request(app)
        .get('/api/headlines/pagination?page=1')
        .set('Cookie', cookie)
        .expect(200)
})

it('returns a 200 if the itemsPerPage is less than the total number of items', async () => {
    const cookie = await global.login()
    await request(app)
        .get('/api/headlines/pagination?itemsPerPage=1')
        .set('Cookie', cookie)
        .expect(200)
})

it('returns a 200 if the page is less than 1', async () => {
    const cookie = await global.login()
    await request(app)
        .get('/api/headlines/pagination?page=0')
        .set('Cookie', cookie)
        .expect(200)
})

it('returns a 200 if the itemsPerPage is less than 1', async () => {
    const cookie = await global.login()
    await request(app)
        .get('/api/headlines/pagination?itemsPerPage=0')
        .set('Cookie', cookie)
        .expect(200)
})