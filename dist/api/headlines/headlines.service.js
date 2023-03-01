"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.headlinesService = void 0;
const bad_request_error_1 = require("./../../errors/bad-request-error");
const mongoose_1 = __importDefault(require("mongoose"));
const headline_model_1 = __importDefault(require("../../models/headline.model"));
const getHeadlines = () => {
    return headline_model_1.default.find({});
};
const getHeadlineById = (id) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(id))
        throw new bad_request_error_1.BadRequestError('Invalid headline id');
    return headline_model_1.default.find({ _id: new mongoose_1.default.Types.ObjectId(id) });
};
const addHeadline = (headline) => {
    return headline_model_1.default.create(headline);
};
const updateHeadline = (id, headline) => {
    return headline_model_1.default.updateOne({ _id: new mongoose_1.default.Types.ObjectId(id) }, Object.assign({}, headline));
};
const removeHeadline = (id) => {
    return headline_model_1.default.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
};
exports.headlinesService = {
    getHeadlines,
    getHeadlineById,
    addHeadline,
    updateHeadline,
    removeHeadline
};
