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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const constants_1 = require("../../constants");
const auth_service_1 = require("./auth.service");
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield auth_service_1.authService.signup(email, password);
        auth_service_1.authService.generateTokens(res, user._id.toString());
        res.status(201).send({ user });
    }
    catch (err) {
        console.log(err, 'signup error');
        next(err);
    }
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield auth_service_1.authService.login(email, password);
        auth_service_1.authService.generateTokens(res, user._id.toString());
        res.status(200).send({ user });
    }
    catch (err) {
        console.log(`
        login could not be completed for ${email}
        params: ${req.body}
        ${err}
        `);
        console.log(err, 'login error');
        next(err);
    }
});
exports.login = login;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie(constants_1.Strings.ACCESS_TOKEN);
        res.clearCookie(constants_1.Strings.REFRESH_TOKEN);
        res.status(204).end();
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.logout = logout;
