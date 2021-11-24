const { response } = require('express');
require('dotenv').config()
const express = require('express');
const app = express();
const Person = require('./models/persons')
const cors =  require('cors');

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get('/api/persons', (req, res, next) => {
    Person.find({})
        .then(obj => res.json(obj))
        .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
        .then(person => {
        if (person) {
            res.json(person)
          } else {
            res.status(404).end()
          }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
    const body = req.body;

    if(!body.name || !body.email || !body.salary || !body.designation){
        return res.status(400).json({ 
            error: 'content missing' 
          })
    }

    const person = new Person({
        name: body.name,
        email: body.email,
        salary: body.salary,
        designation: body.designation
    })

    person.save().then(savedPerson => {
        res.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body;
    const person = {
        name: body.name,
        email: body.email,
        salary: body.salary,
        designation: body.designation
    }

    Person.findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => res.json(updatedPerson))
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
            .then((result) => res.status(204).end())
            .catch(error => next(error));
})

const unknownEndpoint = (req, res) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return res.status(400).send({ error: 'malformatted id' })
    } 
    else if (error.name == 'ValidationError') {
        return res.status(400).send({ error: error.message });
    }
  
    next(error)
  }
  
app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})