import jwt from 'jsonwebtoken'
import { BadRequestError } from '../../errors/bad-request-error'
import User, { UserDoc } from '../../models/user.model'

export const authService = {
    signup,
    login,
    logout,
    generateAccessToken,
    generateRefreshToken,
}

async function signup(email: string, password: string) {
    const existingUser = await User.findOne({ email })
    if (existingUser) throw new BadRequestError('Email in use')

    const user = await User.create({ email, password })

    return user
}

async function login(email: string, password: string) {
    const user = await User.find({ email, password })
    if (!user) return Promise.reject('Invalid username or password')
    return user
}

async function logout() {
    return 'loggedout!'
}

function generateAccessToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, { expiresIn: '5s' })
}

function generateRefreshToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' })
}