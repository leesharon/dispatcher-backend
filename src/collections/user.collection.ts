import mongoose from 'mongoose'

// Define the schema for the existing user collection
const userSchema = new mongoose.Schema({
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
})

// Use the existing user collection
const User = mongoose.model('User', userSchema, 'user')

export default User
