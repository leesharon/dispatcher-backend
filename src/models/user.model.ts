import mongoose from 'mongoose'

interface UserDoc extends Document {
    name: string
    email: string
    password?: string
    favoriteHeadlinesIds: string[]
    notifications: {
        id: string
        text: string
        isUnread: boolean
        createdAt: number
        headLineId: string
    }[]
    lastSignInTime: number
    photoURL: string
}

// Define the schema for the existing user collection
const userSchema = new mongoose.Schema<UserDoc>({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    favoriteHeadlinesIds: {
        type: [String],
        required: false,
    },
    notifications: {
        type: [{
            id: { type: String, required: true },
            text: { type: String, required: true },
            isUnread: { type: Boolean, required: true },
            createdAt: { type: Number, required: true },
            headLineId: { type: String, required: true }
        }],
        required: false,
    },
    lastSignInTime: { type: Number, required: false },
    photoURL: { type: String, required: false },
})

// Use the existing user collection
const User = mongoose.model<UserDoc>('User', userSchema, 'user')

export default User
export type { UserDoc }