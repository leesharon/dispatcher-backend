import { Handler } from 'express'
import { headlinesService } from './headlines.service'

const getHeadlines: Handler = async (req, res) => {
    try {
        const headlines = await headlinesService.getHeadlines()
        res.status(200).send(headlines)

    } catch (err) {
        console.log(err, 'error getting headlines')
        res.status(500).send({ err: 'Failed to get headlines' })
    }
}

const getHeadlineById: Handler = async (req, res) => {
    res.status(200).send('getHeadlineById!!')
    try {
        const headline = await headlinesService.getHeadlineById()
        res.status(200).send(headline)

    } catch (err) {
        console.log(err, 'error getting headlines')
        res.status(500).send({ err: 'Failed to get headline' })
    }
}

export { getHeadlines, getHeadlineById }
