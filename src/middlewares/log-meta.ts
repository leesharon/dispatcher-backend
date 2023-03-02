/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'

export interface LogMeta {
    endpoint: string
    body?: any
    query?: any
    uuid: string
    [key: string]: any
}

export const logMetaMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { method, originalUrl, body, query } = req
    const uuid = uuidv4()

    const logMeta: LogMeta = {
        endpoint: `${method} ${originalUrl}`,
        uuid,
    }
    if (body) logMeta.body = body
    if (query) logMeta.query = query

    req.logMeta = logMeta
    next()
}
