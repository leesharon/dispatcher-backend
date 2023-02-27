import mongoose from 'mongoose'

interface HeadlineDoc extends Document {
    _id: mongoose.Schema.Types.ObjectId
    source: {
        id: string | null
        name: string
    }
    author: string
    title: string
    description: string
    url: string
    urlToImage: string
    publishedAt: string
    content: string
}

// Define the schema for the existing user collection
const headlineSchema = new mongoose.Schema<HeadlineDoc>({
    _id: {
        type: String,
        default: mongoose.Types.ObjectId,
    },
    source: {
        type: {
            id: { type: String || null },
            name: { type: String },
        },
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    urlToImage: {
        type: String,
        required: true,
    },
    publishedAt: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
})

// Use the existing user collection
const Headline = mongoose.model<HeadlineDoc>('Headline', headlineSchema, 'headline')

export default Headline
export type { HeadlineDoc }