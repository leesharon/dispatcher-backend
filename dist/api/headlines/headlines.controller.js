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
exports.removeHeadline = exports.updateHeadline = exports.addHeadline = exports.getHeadlineById = exports.getHeadlines = void 0;
const not_found_error_1 = require("./../../errors/not-found-error");
const database_connection_error_1 = require("../../errors/database-connection-error");
const headlines_service_1 = require("./headlines.service");
const getHeadlines = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const headlines = yield headlines_service_1.headlinesService.getHeadlines();
        if (!headlines)
            throw new database_connection_error_1.DatabaseConnectionError();
        res.status(200).send(headlines);
    }
    catch (err) {
        console.log(err, 'error getting headlines');
        next(err);
    }
});
exports.getHeadlines = getHeadlines;
const getHeadlineById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const headline = yield headlines_service_1.headlinesService.getHeadlineById(id);
        if (headline.length === 0 || !headline)
            throw new database_connection_error_1.DatabaseConnectionError();
        res.status(200).send(headline);
    }
    catch (err) {
        console.log(err, 'error getting headline by id');
        next(err);
    }
});
exports.getHeadlineById = getHeadlineById;
const addHeadline = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { headline } = req.body;
    try {
        const addedHeadline = yield headlines_service_1.headlinesService.addHeadline(headline);
        if (!addedHeadline || headline.length === 0)
            throw new database_connection_error_1.DatabaseConnectionError();
        res.status(200).send(addedHeadline);
    }
    catch (err) {
        console.log(err, 'error adding headline');
        next(err);
    }
});
exports.addHeadline = addHeadline;
const updateHeadline = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { headline } = req.body;
    try {
        const data = yield headlines_service_1.headlinesService.updateHeadline(id, headline);
        if (data.modifiedCount === 0)
            throw new not_found_error_1.NotFoundError();
        res.status(200).send(data);
    }
    catch (err) {
        console.log(err, 'error updating headline');
        next(err);
    }
});
exports.updateHeadline = updateHeadline;
const removeHeadline = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const data = yield headlines_service_1.headlinesService.removeHeadline(id);
        if (data.deletedCount === 0)
            throw new not_found_error_1.NotFoundError();
        res.status(200).send(data);
    }
    catch (err) {
        console.log(err, 'error removing headline');
        next(err);
    }
});
exports.removeHeadline = removeHeadline;
