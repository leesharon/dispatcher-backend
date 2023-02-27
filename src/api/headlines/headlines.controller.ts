import { Handler } from 'express'
import { headlinesService } from './headlines.service'

const getHeadlines: Handler = async (req, res) => {
    try {
        const headlines = await headlinesService.getHeadlines()
        res.status(200).send(headlines)

    } catch (err) {
        console.log(err, 'error getting headlines')
        res.status(500).send({ err: 'getHeadlines failed to get headlines' })
    }
}

const getHeadlineById: Handler = async (req, res) => {
    const { id } = req.params
    try {
        const headline = await headlinesService.getHeadlineById(id)
        if (!headline) return res.status(404).send({ err: 'headline not found' })
        res.status(200).send(headline)

    } catch (err) {
        console.log(err, 'error getting headlines')
        res.status(500).send({ err: 'getHeadlineById failed to get headline' })
    }
}

export { getHeadlines, getHeadlineById }
