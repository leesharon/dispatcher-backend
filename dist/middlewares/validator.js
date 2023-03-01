"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const express_validator_1 = require("express-validator");
const validateHeadline = () => {
    return [
        (0, express_validator_1.body)('headline').isObject().withMessage('headline must be an object'),
        (0, express_validator_1.body)('headline.title').isString().withMessage('headline title must be a string'),
        (0, express_validator_1.body)('headline.content').isString().withMessage('headline content must be a string'),
        (0, express_validator_1.body)('headline.author').isString().withMessage('headline author must be a string'),
        (0, express_validator_1.body)('headline.description').isString().withMessage('headline description must be a string'),
        (0, express_validator_1.body)('headline.url').isString().withMessage('headline url must be a string'),
        (0, express_validator_1.body)('headline.urlToImage').isString().withMessage('headline urlToImage must be a string'),
        (0, express_validator_1.body)('headline.publishedAt').isString().withMessage('headline publishedAt must be a string'),
        (0, express_validator_1.body)('headline.author').isString().withMessage('headline author must be an string'),
    ];
};
const validateAuth = () => {
    return [
        (0, express_validator_1.body)('email').isEmail().withMessage('Email must be valid'),
        (0, express_validator_1.body)('password').trim()
            .isLength({ min: 12, max: 20 })
            .withMessage('Password must be between 12 and 20 characters')
            .matches(/^(?=.*[A-Z])(?=.*\d)/)
            .withMessage('Password must contain at least one uppercase letter and one number')
    ];
};
exports.Validator = {
    validateHeadline,
    validateAuth,
};
