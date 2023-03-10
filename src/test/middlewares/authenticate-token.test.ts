/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import { authenticateToken } from './../../middlewares/authenticate-token'

it('should throw an error if no accessToken on cookie', () => {
    const req = {
        cookies: {
            accessToken: null
        }
    }
    expect(authenticateToken.bind(this, req as any, {} as any, () => { })).toThrow('Not Authorized')
})