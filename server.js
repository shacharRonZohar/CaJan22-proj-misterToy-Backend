const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const toyService = require('./services/toyService')
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/api/toy', (req, res) => {
    toyService.query()
        .then(toys => res.send(toys))
        .catch(() => res.status(404).send(`Couldnt get toys`))
})

app.get('/api/toy/:toyId', (req, res) => {
    toyService.getById(req.params.toyId)
        .then(toy => res.send(toy))
        .catch(err => res.send(`Couldnt get toy ${req.params.toyId} with error: ${err}`))
})

app.delete('/api/toy/:toyId', (req, res) => {
    console.log(req)
    toyService.remove(req.params.toyId)
        .then(() => res.send({ msg: 'Removed' }))
        .catch(err => {
            console.log('Backend had error: ', err)
            res.status(404).send('Couldnt remove toy')
        })

})

app.post('/api/toy', (req, res) => {
    // Create
    const {
        name,
        price,
        labels,
        inStock
    } = req.body

    const toy = {
        name,
        price,
        labels,
        inStock,
    }

    toyService.save(toy)
        .then(savedToy => res.send(savedToy))
        .catch(err => {
            console.log('Backend had error: ', err)
            res.status(401).send('Cannot create Toy')
        })

})

app.put('/api/toy/:toyId', (req, res) => {
    // Update
    const {
        _id,
        name,
        price,
        labels,
        inStock,
        createdAt
    } = req.body

    const toy = {
        _id,
        name,
        price,
        labels,
        inStock,
        createdAt
    }

    toyService.save(toy)
        .then((savedToy) => res.send(savedToy))
        .catch(err => {
            console.log('Backend had error: ', err)
            res.status(404).send(`Couldnt update toy`)
        })
})

app.listen(3031,
    () => console.log('http://localhost:3031'))
