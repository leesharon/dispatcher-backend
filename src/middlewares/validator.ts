import { NextFunction, Request, Response } from 'express'

export const Validator = {
    validateHeadline
}

async function validateHeadline(req: Request, res: Response, next: NextFunction) {
    if (!req.params.id) res.status(400).send('Request params is missing id')
    if (!req.body) res.status(400).send('Request body is missing')
    if (!req.body.headline) res.status(400).send('Request body is missing headline')
    if (typeof req.body.headline !== 'object') res.status(400).send('Headline must be a object')
    if (!req.body.headline.title) res.status(400).send('Headline must have a title')
    if (typeof req.body.headline.title !== 'string') res.status(400).send('Headline title must be a string')

    next()
}