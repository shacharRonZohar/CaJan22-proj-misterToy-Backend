const fs = require('fs')

const toys = require('../data/toy.json')

function query() {
    return Promise.resolve(toys)
}

function getById(toyId) {
    return new Promise((resolve, reject) => {
        const toy = toys.find(toy => toy._id === toyId)
        if (toy) return resolve(toy)
        reject(`No toy with id === ${toyId} was found`)
    })
}

function save({ _id, name, price, labels, inStock, createdAt = Date.now() }) {
    const toyToSave = {
        _id,
        name,
        price,
        labels,
        inStock,
        createdAt,
    }
    if (_id) {
        console.log(toyToSave)
        const idx = toys.findIndex(toy => toy._id === _id)
        toys[idx] = toyToSave
    } else {
        // CREATE
        toyToSave._id = _makeId()
        toys.unshift(toyToSave)
    }
    return _saveToysToFile()
        .then(() => toyToSave)
}

function remove(toyId, loggedinUser) {
    return new Promise((resolve, reject) => {
        const idx = toys.findIndex(toy => toy._id === toyId)
        if (idx === -1) return reject('No such toy')
        toys.splice(idx, 1)
        _saveToysToFile()
            .then(resolve)
    })
}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        fs.writeFile('data/toy.json', JSON.stringify(toys, null, 2), (err) => {
            if (err) return reject(err)
            resolve()
        })
    })
}

function _makeId(length = 5) {
    let txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}
module.exports = {
    save,
    query,
    remove,
    getById,
}