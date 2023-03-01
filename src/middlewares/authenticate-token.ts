import { Handler } from 'express'
import jwt from 'jsonwebtoken'
import { NoAccessError } from '../errors/no-access'
import { NotAuthorizedError } from '../errors/not-authorized-error'

export const authenticateToken: Handler = (req: any, res, next) => {
    const token = req.cookies.accessToken
    if (!token) throw new NotAuthorizedError()

    jwt.verify(token, process.env.JWT_ACCESS_SECRET!, (err: any, userId: any) => {
        if (err) throw new NoAccessError()
        req.userId = userId
        next()
    })
}