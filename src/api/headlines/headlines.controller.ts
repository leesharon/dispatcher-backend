import { NotFoundError } from './../../errors/not-found-error'
import { Handler } from 'express'
import { DatabaseConnectionError } from '../../errors/database-connection-error'
import { HeadlineDoc } from '../../models/headline.model'
import { headlinesService } from './headlines.service'

const getHeadlines: Handler = async (req, res, next) => {
    try {
        const headlines = await headlinesService.getHeadlines()
        if (!headlines) throw new DatabaseConnectionError()
        res.status(200).send(headlines)

    } catch (err) {
        console.log(err, 'error getting headlines')
        next(err)
    }
}

const getHeadlineById: Handler = async (req, res, next) => {
    const { id } = req.params
    try {
        const headline = await headlinesService.getHeadlineById(id)
        if (headline.length === 0 || !headline) throw new DatabaseConnectionError()
        res.status(200).send(headline)

    } catch (err) {
        console.log(err, 'error getting headline by id')
        next(err)
    }
}

const addHeadline: Handler = async (req, res, next) => {
    const { headline } = req.body
    try {
        const addedHeadline = await headlinesService.addHeadline(headline)
        if (!addedHeadline || headline.length === 0) throw new DatabaseConnectionError()
        res.status(200).send(addedHeadline)

    } catch (err) {
        console.log(err, 'error adding headline')
        next(err)
    }
}

const updateHeadline: Handler = async (req, res, next) => {
    const { id } = req.params
    const { headline } = req.body
    try {
        const data = await headlinesService.updateHeadline(id, headline as HeadlineDoc)
        if (data.modifiedCount === 0) throw new NotFoundError()
        res.status(200).send(data)

    } catch (err) {
        console.log(err, 'error updating headline')
        next(err)
    }
}

const removeHeadline: Handler = async (req, res, next) => {
    const { id } = req.params
    try {
        const data = await headlinesService.removeHeadline(id)
        if (data.deletedCount === 0) throw new NotFoundError()
        res.status(200).send(data)

    } catch (err) {
        console.log(err, 'error removing headline')
        next(err)
    }
}

export { getHeadlines, getHeadlineById, addHeadline, updateHeadline, removeHeadline }
