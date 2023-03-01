"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const no_access_1 = require("../errors/no-access");
const not_authorized_error_1 = require("../errors/not-authorized-error");
const authenticateToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token)
        throw new not_authorized_error_1.NotAuthorizedError();
    jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESS_SECRET, (err, userId) => {
        if (err)
            throw new no_access_1.NoAccessError();
        req.userId = userId;
        next();
    });
};
exports.authenticateToken = authenticateToken;
