import { Handler } from 'express'

const getHeadlines: Handler = async (req, res) => {
    res.status(200).send('get headlines!!')
}

export { getHeadlines }
