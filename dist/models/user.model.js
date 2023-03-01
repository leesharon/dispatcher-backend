"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema for the existing user collection
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    favoriteHeadlinesIds: {
        type: [String],
        required: false,
    },
    notifications: {
        type: [{
                id: { type: String, required: true },
                text: { type: String, required: true },
                isUnread: { type: Boolean, required: true },
                createdAt: { type: Number, required: true },
                headLineId: { type: String, required: true }
            }],
        required: false,
    },
    lastSignInTime: { type: Number, required: false },
    photoURL: { type: String, required: false },
});
// Use the existing user collection
const User = mongoose_1.default.model('User', userSchema, 'user');
exports.default = User;
