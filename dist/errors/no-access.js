"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoAccessError = void 0;
const custom_error_1 = require("./custom-error");
class NoAccessError extends custom_error_1.CustomError {
    constructor() {
        super('No Access');
        this.statusCode = 403;
        Object.setPrototypeOf(this, NoAccessError.prototype);
    }
    serializeErrors() {
        return [{ message: 'No Access' }];
    }
}
exports.NoAccessError = NoAccessError;
