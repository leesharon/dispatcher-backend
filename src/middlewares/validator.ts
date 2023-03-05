import { body } from 'express-validator'

const validateHeadline = () => {
    return [
        body('itemData').isObject().withMessage('headline must be an object'),
        body('itemData.title').isString().withMessage('headline title must be a string'),
        body('itemData.content').isString().withMessage('headline content must be a string'),
        body('itemData.author').isString().withMessage('headline author must be a string'),
        body('itemData.description').isString().withMessage('headline description must be a string'),
        body('itemData.url').isString().withMessage('headline url must be a string'),
        body('itemData.urlToImage').isString().withMessage('headline urlToImage must be a string'),
        body('itemData.publishedAt').isString().withMessage('headline publishedAt must be a string'),
        body('itemData.author').isString().withMessage('headline author must be an string'),
    ]
}

const validateAuth = () => {
    return [
        body('user').isObject().withMessage('user must be an object'),
        body('user.email').isEmail().withMessage('Email must be valid'),
        body('user.password').trim()
            .isLength({ min: 12, max: 20 })
            .withMessage('Password must be between 12 and 20 characters')
            .matches(/^(?=.*[A-Z])(?=.*\d)/)
            .withMessage('Password must contain at least one uppercase letter and one number')
    ]
}

export const Validator = {
    validateHeadline,
    validateAuth,
}