/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, Router, NextFunction, RequestHandler } from 'express'
// import ISchema from './baseInterface.interface'
import mongoose, { Model } from 'mongoose'
import { NotFoundError } from '../../src/errors/not-found-error'
import { BadRequestError } from '../../src/errors/bad-request-error'
import { DatabaseConnectionError } from '../../src/errors/database-connection-error'
// import { MongoErrorException } from '../exceptions'
// import { PaginationModel } from '../models/pagination.model'
// import { DocumentStatusEnum } from '../types/documentStatus.enum'

abstract class CrudController {
    public router = Router()
    public t: Model<any>
    protected baseSort!: object

    constructor() {
        this.initializeRoutes()
        this.t = this.getSchema()
    }

    protected abstract initializeRoutes(): void;
    protected abstract getSchema(): Model<any>;

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const items = await this.t.find({}).lean()
            if (!items) throw new DatabaseConnectionError()
            res.status(200).send({ items })

        } catch (err) {
            console.log(`getAll could not be completed.
                logMeta: ${JSON.stringify(req.logMeta)}
                err: ${err}`)
            next(err)
        }
    }

    async getById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid headline id')
            const item = await this.t.find({ _id: new mongoose.Types.ObjectId(id) }).lean()
            if (item.length === 0 || !item) throw new NotFoundError()
            res.status(200).send({ item })

        } catch (err) {
            console.log(`getById could not be completed for ${id}
                        logMeta: ${JSON.stringify(req.logMeta)}
                        err: ${err}`)
            next(err)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        const { itemData }: any = req.body
        try {
            const addedItem = await this.t.create(itemData)
            if (!addedItem || addedItem.length === 0) throw new DatabaseConnectionError()
            res.status(201).send({ addedItem })

        } catch (err) {
            console.log(`create could not be completed for ${this.t}
                logMeta: ${JSON.stringify(req.logMeta)}
                err: ${err}`)
            next(err)
        }
    }

    async remove(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid headline id')
            const deletedItem = await this.t.findByIdAndDelete(id)
            if (!deletedItem) throw new NotFoundError()
            res.status(204).send({})

        } catch (err) {
            console.log(`remove could not be completed for ${id}
                logMeta: ${JSON.stringify(req.logMeta)}
                err: ${err}`)
            next(err)
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params
        const { itemData } = req.body
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid headline id')

            const updated = await this.t.findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(id) },
                { ...itemData },
                { new: true, useFindAndModify: false }
            ).lean()

            if (updated === null) throw new NotFoundError()
            res.status(200).send({ updated })

        } catch (err) {
            console.log(`update could not be completed for ${id}
                logMeta: ${JSON.stringify(req.logMeta)}
                err: ${err}`)
            next(err)
        }
    }
}


export default CrudController