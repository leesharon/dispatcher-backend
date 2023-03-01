"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Define the schema for the existing user collection
const headlineSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: mongoose_1.default.Types.ObjectId,
    },
    source: {
        type: {
            id: { type: String || null },
            name: { type: String },
        },
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    urlToImage: {
        type: String,
        required: true,
    },
    publishedAt: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
// Use the existing user collection
const Headline = mongoose_1.default.model('Headline', headlineSchema, 'headline');
exports.default = Headline;
