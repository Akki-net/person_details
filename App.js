const express = require('express');
const app = express();
const cors =  require('cors');
const middleware = require('./utils/middleware')
const personsRouter = require('./controllers/persons')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))
app.use(middleware.requestLogger);

app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
