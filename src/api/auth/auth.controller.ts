import { Handler } from 'express'
import { authService } from './auth.service'

const signup: Handler = async (req: any, res, next) => {
    const { email, password } = req.body
    try {
        const user = await authService.signup(email, password)

        const accessToken = authService.generateAccessToken(user._id.toString())
        const refreshToken = authService.generateRefreshToken(user._id.toString())

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            maxAge: 15 * 60 * 1000 // 15 minutes
        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        res.status(201).send({ user, accessToken, refreshToken })

    } catch (err) {
        console.log(err, 'signup error')
        next(err)
    }
}

const login: Handler = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await authService.login(email, password)

        // const accessToken = authService.generateAccessToken(user._id.toString())
        // const refreshToken = authService.generateRefreshToken(user._id.toString())

        // res.cookie('accessToken', accessToken, {
        //     httpOnly: true,
        //     maxAge: 15 * 60 * 1000 // 15 minutes
        // })
        // res.cookie('refreshToken', refreshToken, {
        //     httpOnly: true,
        //     maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        // })
        // res.status(200).send({ user, accessToken, refreshToken })
        res.status(200).send({ user })

    } catch (err) {
        console.log(err, 'login error')
        res.status(401).send({ err: 'Failed to Login' })
    }
}

const logout: Handler = async (req, res) => {
    try {
        const user = await authService.logout()
        res.status(200).send(user)

    } catch (err) {
        console.log(err, 'logout error')
        res.status(500).send({ err: 'Failed to logout' })
    }
}

export { signup, login, logout }
