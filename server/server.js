const express = require('express')
const { ObjectId } = require('mongodb')
const app = express()
const port = 5000
const cors = require('cors')
const client = require('./MongoClient.js')

app.use(cors())
app.use(express.json())

app.get('/api/series', async (req, res) => {
    try {
        await client.connect()

        const db = client.db('seriesTracker')
        const seriesCollection = db.collection('series')

        const seriesResponse = []

        const series = await seriesCollection
            .find({})
            .forEach(item => seriesResponse.push(item))

        res.send(seriesResponse)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/api/movies', async (req, res) => {
    try {
        await client.connect()

        const db = client.db('seriesTracker')
        const moviesCollection = db.collection('movies')

        const moviesResponse = []

        const movies = await moviesCollection
            .find({})
            .forEach(item => moviesResponse.push(item))

        res.send(moviesResponse)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/api/:type', async (req, res) => {
    const { type } = req.params
    const { name } = req.body

    try {
        await client.connect()
        const db = client.db('seriesTracker')
        const result = await db.collection(type)
            .insertOne(
                { name }
            )
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.put('/api/:type', async (req, res) => {
    const { id, percentage, season, episode } = req.body
    const { type } = req.params
    const updatedObj = type === 'series' ? { season, episode } : { percentage }

    try {
        await client.connect()
        const db = client.db('seriesTracker')
        const result = await db.collection(type)
            .updateOne(
                { _id: new ObjectId(id) },
                { $set: updatedObj }
            )
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.delete('/api/:type', async (req, res) => {
    const { id } = req.body
    const { type } = req.params

    try {
        await client.connect()
        const db = client.db('seriesTracker')
        const result = await db.collection(type)
            .findOneAndDelete(
                { _id: new ObjectId(id) }
            )
        res.send(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

app.listen(port, () => {
    console.log(`listening in port ${port}`)
})