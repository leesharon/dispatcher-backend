import { BadRequestError } from './../../errors/bad-request-error'
import mongoose from 'mongoose'
import Headline, { HeadlineDoc } from '../../models/headline.model'

const getHeadlines = () => {
    return Headline.find({})
}

const getHeadlineById = (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid headline id')
    return Headline.find({ _id: new mongoose.Types.ObjectId(id) })
}

const addHeadline = (headline: HeadlineDoc) => {
    return Headline.create(headline)
}

const updateHeadline = (id: string, headline: HeadlineDoc) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid headline id')
    return Headline.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { ...headline })
}

const removeHeadline = (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid headline id')
    return Headline.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
}

export const headlinesService = {
    getHeadlines,
    getHeadlineById,
    addHeadline,
    updateHeadline,
    removeHeadline
}
