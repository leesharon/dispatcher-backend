import mongoose from 'mongoose'
import Headline, { HeadlineDoc } from '../../models/headline.model'

export const headlinesService = {
    getHeadlines,
    getHeadlineById,
    addHeadline
}

async function getHeadlines() {
    return Headline.find({})
}

async function getHeadlineById(id: string) {
    return Headline.find({ _id: new mongoose.Types.ObjectId(id) })
}

async function addHeadline(title: string, description: string, url: string, urlToImage: string, publishedAt: string, source: string, author: string, content: string) {
    return Headline.create({ title, description, url, urlToImage, publishedAt, source, author, content })
}

