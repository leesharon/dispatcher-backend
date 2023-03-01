"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_request_1 = require("./../../middlewares/validate-request");
const validator_1 = require("./../../middlewares/validator");
const express_1 = __importDefault(require("express"));
const headlines_controller_1 = require("./headlines.controller");
const router = express_1.default.Router();
router.get('/', headlines_controller_1.getHeadlines);
router.get('/:id', headlines_controller_1.getHeadlineById);
router.post('/', validator_1.Validator.validateHeadline(), validate_request_1.validateRequest, headlines_controller_1.addHeadline);
router.put('/:id', headlines_controller_1.updateHeadline);
router.delete('/:id', headlines_controller_1.removeHeadline);
exports.default = router;
