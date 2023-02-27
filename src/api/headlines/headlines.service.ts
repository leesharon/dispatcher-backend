import mongoose from 'mongoose'
import Headline from '../../models/headline.model'

export const headlinesService = {
    getHeadlines,
    getHeadlineById
}

async function getHeadlines() {
    return Headline.find({})
}

async function getHeadlineById(id: string) {
    return Headline.find({ _id: new mongoose.Types.ObjectId(id) })
}