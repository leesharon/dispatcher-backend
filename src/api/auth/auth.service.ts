import { BadRequestError } from '../../errors/bad-request-error'
import User from '../../models/user.model'

export const authService = {
    signup,
    login,
    logout
}

async function signup(email: string, password: string) {
    const existingUser = await User.findOne({ email })
    if (existingUser) throw new BadRequestError('Email in use')

    const user = User.create({ email, password })



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