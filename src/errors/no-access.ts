import { CustomError } from './custom-error'

export class NoAccessError extends CustomError {
    statusCode = 403

    constructor() {
        super('No Access')

        Object.setPrototypeOf(this, NoAccessError.prototype)
    }

    serializeErrors() {
        return [{ message: 'No Access' }]
    }
}
