import { body } from 'express-validator'

export const Validator = {
    validateHeadline
}

function validateHeadline() {
    return [
        body('headline').isObject().withMessage('headline must be an object'),
        body('headline.title').isString().withMessage('headline title must be a string'),
        body('headline.content').isString().withMessage('headline content must be a string'),
        body('headline.author').isString().withMessage('headline author must be a string'),
        body('headline.description').isString().withMessage('headline description must be a string'),
        body('headline.url').isString().withMessage('headline url must be a string'),
        body('headline.urlToImage').isString().withMessage('headline urlToImage must be a string'),
        body('headline.publishedAt').isString().withMessage('headline publishedAt must be a string'),
        body('headline.author').isString().withMessage('headline author must be an string'),
    ]
}