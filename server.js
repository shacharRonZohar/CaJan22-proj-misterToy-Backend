const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.listen(3031,
    () => console.log('http://localhost:3031'))
