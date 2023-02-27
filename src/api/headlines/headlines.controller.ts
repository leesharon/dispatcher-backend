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
        if (!headline) throw new Error('headline not found')
        res.status(200).send(headline)

    } catch (err) {
        console.log(err, 'error getting headlines')
        res.status(500).send({ err: 'getHeadlineById failed to get headline' })
    }
}

const addHeadline: Handler = async (req, res) => {
    const { source, author, title, description, url, urlToImage, publishedAt, content } = req.body
    try {
        const headline = await headlinesService.addHeadline(title, description, url, urlToImage, publishedAt, source, author, content)
        if (!headline) throw new Error('headline not could not be created')
        res.status(200).send(headline)

    } catch (err) {
        console.log(err, 'error adding headline')
        res.status(500).send({ err: 'addHeadline failed to add headline' })
    }
}

export { getHeadlines, getHeadlineById, addHeadline }
