import { BadRequestError } from './../../errors/bad-request-error'
import mongoose from 'mongoose'
import Headline, { HeadlineDoc } from '../../models/headline.model'

export const headlinesService = {
    getHeadlines,
    getHeadlineById,
    addHeadline,
    updateHeadline,
    removeHeadline
}

async function getHeadlines() {
    return Headline.find({})
}

async function getHeadlineById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestError('Invalid headline id')
    return Headline.find({ _id: new mongoose.Types.ObjectId(id) })
}

async function addHeadline(headline: HeadlineDoc) {
    return Headline.create(headline)
}

async function updateHeadline(id: string, headline: HeadlineDoc) {
    return Headline.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { ...headline })
}

async function removeHeadline(id: string) {
    return Headline.deleteOne({ _id: new mongoose.Types.ObjectId(id) })
}

