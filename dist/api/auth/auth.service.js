"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const bad_request_error_1 = require("../../errors/bad-request-error");
const user_model_1 = __importDefault(require("../../models/user.model"));
const not_authorized_error_1 = require("../../errors/not-authorized-error");
const constants_1 = require("../../constants");
const signup = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.default.findOne({ email });
    if (existingUser)
        throw new bad_request_error_1.BadRequestError('Email in use');
    const saltRounds = 10;
    const hash = yield bcrypt_1.default.hash(password, saltRounds);
    const user = yield user_model_1.default.create({ email, password: hash });
    return user.toObject({
        transform: (doc, ret) => {
            delete ret.password;
        }
    });
});
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.default.findOne({ email }).select('+password');
    if (!existingUser)
        throw new bad_request_error_1.BadRequestError('user does not exist');
    if (!existingUser.password)
        throw new bad_request_error_1.BadRequestError('user does not have a password');
    const match = yield bcrypt_1.default.compare(password, existingUser.password);
    if (!match)
        throw new not_authorized_error_1.NotAuthorizedError();
    return existingUser.toObject({
        transform: (doc, ret) => {
            delete ret.password;
        }
    });
});
const generateTokens = (res, userId) => {
    const accessToken = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    const refreshToken = jsonwebtoken_1.default.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    res.cookie(constants_1.Strings.ACCESS_TOKEN, accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    });
    res.cookie(constants_1.Strings.REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
};
exports.authService = {
    signup,
    login,
    generateTokens,
};
