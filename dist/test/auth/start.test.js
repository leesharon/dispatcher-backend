"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mocha_1 = require("mocha");
// import { authenticateToken } from '../middlewares/authenticate-token'
(0, mocha_1.it)('check if the test is working', () => {
    (0, chai_1.expect)(true).not.to.equal(false);
});
