import { Handler } from 'express'
import { authService } from './auth.service'

const signup: Handler = async (req, res) => {
    try {
        const user = await authService.signup()
        res.status(200).send(user)

    } catch (err) {
        console.log(err, 'signup error')
        res.status(500).send({ err: 'Failed to signup' })
    }
}

const login: Handler = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await authService.login(email, password)
        res.status(200).send(user)

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
