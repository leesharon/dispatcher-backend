/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { expect } from 'chai'
import request from 'supertest'
import { authenticateToken } from './../../middlewares/authenticate-token'
import app from './../../server'

it('should throw an error if no accessToken on cookie', () => {
    const req = {
        cookies: {
            accessToken: null
        }
    }
    expect(authenticateToken.bind(this, req as any, {} as any, () => { })).to.throw('Not Authorized')
})

it('should log in a user', async () => {
    const cookie = await global.login()
    console.log('global.signin= ~ cookie:', cookie)

    const response = await request(app)
        .post('/api/auth/login')
        .send({
            email: 'l@l.commm',
            password: 'Lol123123123',
        })
    expect(response.status).to.equal(200)
    // expect(response.).to.have.property('token')
})
