import { Handler } from 'express'
import { HeadlineDoc } from '../../models/headline.model'
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
    const { headline } = req.body
    try {
        const addedHeadline = await headlinesService.addHeadline(headline)
        if (!addedHeadline) throw new Error('headline could not be created')
        res.status(200).send(addedHeadline)

    } catch (err) {
        console.log(err, 'error adding headline')
        res.status(500).send({ err: 'addHeadline failed to add headline' })
    }
}

const updateHeadline: Handler = async (req, res) => {
    const { id } = req.params
    const { headline } = req.body
    try {
        const updatedHeadline = await headlinesService.updateHeadline(id, headline as HeadlineDoc)
        if (!updatedHeadline) throw new Error('headline could not be updated')
        res.status(200).send(updatedHeadline)

    } catch (err) {
        console.log(err, 'error updating headline')
        res.status(500).send({ err: 'updateHeadline failed to update headline' })
    }
}

const removeHeadline: Handler = async (req, res) => {
    const { id } = req.params
    try {
        const removedHeadline = await headlinesService.removeHeadline(id)
        if (!removedHeadline) throw new Error('headline could not be removed')
        res.status(200).send(removedHeadline)

    } catch (err) {
        console.log(err, 'error removing headline')
        res.status(500).send({ err: 'removeHeadline failed to remove headline' })
    }
}

export { getHeadlines, getHeadlineById, addHeadline, updateHeadline, removeHeadline }
