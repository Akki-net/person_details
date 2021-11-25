const personsRouter = require('express').Router();
const Person = require('../models/persons')

personsRouter.get('/', (req, res, next) => {
    Person.find({})
        .then(obj => res.json(obj))
        .catch(error => next(error))
})

personsRouter.get('/:id', (req, res, next) => {
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

personsRouter.post('/', (req, res, next) => {
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

personsRouter.put('/:id', (req, res, next) => {
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

personsRouter.delete('/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
            .then((result) => res.status(204).end())
            .catch(error => next(error));
})

module.exports = personsRouter