/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import request from 'supertest'
import { expect } from 'chai'
import app from './../../app'

it('should log in a user', async () => {
    const cookie = await global.login()

    const response = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'l@l.com',
            password: 'Lol123123123',
        })
    expect(response.status).to.equal(200)
})