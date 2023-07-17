const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

const knex = require('knex')(require('./knexfile.js')['development'])

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('hello, here is the movies database')
})

app.get('/movies', (req, res) => {
    knex('movies')
    .select('*')
    .then(data => res.json(data))
})

app.post('/movies', async (req, res) => {
    const body = req.body;
    console.log({body})
    try {
        const movies = await knex('movies').insert(body)
        res.status(201).send(movies);
    } catch (error) {
        res.status(500).json({error})
    }
})

app.delete('/movies', (req, res) => {
    knex('movies').where({id: req.body.name}).del()
        .then(function() {
            res.json("Deleted Successfully")
        })
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})