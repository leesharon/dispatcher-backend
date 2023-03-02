import { Handler } from 'express'
import { Strings } from '../../constants'
import { authService } from './auth.service'

const signup: Handler = async (req, res, next) => {
    const { user } = req.body
    const { email, password } = user
    try {
        const user = await authService.signup(email, password)

        authService.generateTokens(res, user._id.toString())
        res.status(201).send({ user })

    } catch (err) {
        console.log(`
        signup could not be completed for ${email}
        logMeta: ${JSON.stringify(req.logMeta)}
        err: ${err}
        `)
        next(err)
    }
}

const login: Handler = async (req, res, next) => {
    const { user } = req.body
    const { email, password } = user
    try {
        const user = await authService.login(email, password)
        authService.generateTokens(res, user._id.toString())
        res.status(200).send({ user })

    } catch (err) {
        console.log(`
        login could not be completed for ${email}
        logMeta: ${JSON.stringify(req.logMeta)}
        err: ${err}
        `)
        next(err)
    }
}

const logout: Handler = async (req, res, next) => {
    try {
        res.clearCookie(Strings.ACCESS_TOKEN)
        res.clearCookie(Strings.REFRESH_TOKEN)
        res.status(204).end()

    } catch (err) {
        console.log(`
        logout could not be completed
        logMeta: ${JSON.stringify(req.logMeta)}
        err: ${err}
        `)
        next(err)
    }
}

export { signup, login, logout }
