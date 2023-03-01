"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const headlines_routes_1 = __importDefault(require("./headlines/headlines.routes"));
const authenticate_token_1 = require("./../middlewares/authenticate-token");
const router = express_1.default.Router();
router.use('/auth', auth_routes_1.default);
router.use('/headlines', authenticate_token_1.authenticateToken, headlines_routes_1.default);
exports.default = router;
