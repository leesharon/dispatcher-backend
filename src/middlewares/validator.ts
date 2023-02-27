import { NextFunction, Request, Response } from 'express'

export const Validator = {
    validateHeadline
}

async function validateHeadline(req: Request, res: Response, next: NextFunction) {
    if (!req.body) return res.status(400).send('Request body is missing')
    if (!req.body.headline) return res.status(400).send('Request body is missing headline')
    if (typeof req.body.headline !== 'object') return res.status(400).send('Headline must be a object')
    if (!req.body.headline.title) return res.status(400).send('Headline must have a title')
    if (typeof req.body.headline.title !== 'string') return res.status(400).send('Headline title must be a string')
    if (!req.body.headline.description) return res.status(400).send('Headline must have a description')
    if (typeof req.body.headline.description !== 'string') return res.status(400).send('Headline description must be a string')
    if (!req.body.headline.url) return res.status(400).send('Headline must have a url')
    if (typeof req.body.headline.url !== 'string') return res.status(400).send('Headline url must be a string')
    if (!req.body.headline.urlToImage) return res.status(400).send('Headline must have a urlToImage')
    if (typeof req.body.headline.urlToImage !== 'string') return res.status(400).send('Headline urlToImage must be a string')
    if (!req.body.headline.publishedAt) return res.status(400).send('Headline must have a publishedAt')
    if (typeof req.body.headline.publishedAt !== 'string') return res.status(400).send('Headline publishedAt must be a string')
    if (!req.body.headline.content) return res.status(400).send('Headline must have a content')
    if (typeof req.body.headline.content !== 'string') return res.status(400).send('Headline content must be a string')
    if (!req.body.headline.source) return res.status(400).send('Headline must have a source')
    if (typeof req.body.headline.source !== 'object') return res.status(400).send('Headline source must be a object')
    if (!req.body.headline.source.id) return res.status(400).send('Headline must have a source id')
    if (typeof req.body.headline.source.id !== 'string') return res.status(400).send('Headline source id must be a string')
    if (!req.body.headline.source.name) return res.status(400).send('Headline must have a source name')
    if (typeof req.body.headline.source.name !== 'string') return res.status(400).send('Headline source name must be a string')
    if (!req.body.headline.author) return res.status(400).send('Headline must have a author')
    if (typeof req.body.headline.author !== 'string') return res.status(400).send('Headline author must be a string')
    next()
}