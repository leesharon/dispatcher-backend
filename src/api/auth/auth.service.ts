import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { BadRequestError } from '../../errors/bad-request-error'
import User from '../../models/user.model'
import { NotAuthorizedError } from '../../errors/not-authorized-error'
import { Response } from 'express'
import { Strings } from '../../constants'

export const authService = {
    signup,
    login,
    generateTokens,
    generateAccessToken,
    generateRefreshToken,
}

async function signup(email: string, password: string) {
    const existingUser = await User.findOne({ email })
    if (existingUser) throw new BadRequestError('Email in use')

    const saltRounds = 10
    const hash = await bcrypt.hash(password, saltRounds)

    const user = await (await User.create({ email, password: hash })).toObject()
    delete user.password
    return user
}

async function login(email: string, password: string) {
    const existingUser = await User.findOne({ email })
    if (!existingUser) throw new BadRequestError('user does not exist')
    if (!existingUser.password) throw new BadRequestError('user does not have a password')

    const match = await bcrypt.compare(password, existingUser.password)
    if (!match) throw new NotAuthorizedError()

    const userObject = existingUser.toObject()
    delete userObject.password

    return userObject
}

function generateTokens(res: Response, userId: string) {
    const accessToken = authService.generateAccessToken(userId)
    const refreshToken = authService.generateRefreshToken(userId)

    res.cookie(Strings.ACCESS_TOKEN, accessToken, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000 // 15 minutes
    })
    res.cookie(Strings.REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
}

function generateAccessToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET!, { expiresIn: '15m' })
}

function generateRefreshToken(userId: string) {
    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET!, { expiresIn: '7d' })
}