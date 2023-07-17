const express = require('express')
const knexfile = require('./knexfile')
const app = express()
const port = 3001

const knex = require('knex')(require('knexfile'))

app.get('/', (req, res) => {
    res.send('hello, here is the movies database')
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})