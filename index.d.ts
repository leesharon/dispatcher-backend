import { LogMeta } from 'src/middlewares/log-meta'

export { }

declare global {
    namespace Express {
        export interface Request {
            logMeta: LogMeta
        }
    }
}