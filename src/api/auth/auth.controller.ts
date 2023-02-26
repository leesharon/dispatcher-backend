import { Handler } from 'express'

const signup: Handler = async (req, res) => {
    res.status(200).send('signedup!!')
}

const login: Handler = async (req, res) => {
    res.status(200).send('loggedin!')
}

const logout: Handler = async (req, res) => {
    res.status(200).send('loggedout!')
}

export { signup, login, logout }
