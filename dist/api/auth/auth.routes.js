"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_request_1 = require("./../../middlewares/validate-request");
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validator_1 = require("../../middlewares/validator");
const router = express_1.default.Router();
router.post('/login', validator_1.Validator.validateAuth(), validate_request_1.validateRequest, auth_controller_1.login);
router.post('/signup', validator_1.Validator.validateAuth(), validate_request_1.validateRequest, auth_controller_1.signup);
router.post('/logout', auth_controller_1.logout);
exports.default = router;
