const { response } = require('express');
const express = require('express');
const app = express();
const cors =  require('cors');

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

let persons = [
    {
      id: 1,
      name: "Hari",
      email: "harisingh123@gmail.com",
      salary: 32000,
      designation: "chief operator"
    },
    {
      name: "akash",
      email: "akashsharma.zak@gmail.com",
      salary: 17000,
      designation: "Graphic designer",
      id: 4
    },
    {
      name: "nishi",
      email: "betripelti@vusra.com",
      salary: 15235,
      designation: "Civil Engineer",
      id: 6
    },
    {
      name: "mamta",
      email: "mamtasad751@gmail.com",
      salary: 30000,
      designation: "Doctor",
      id: 7
    },
    {
      name: "prasad",
      email: "cunehapu@norwegischlernen.info",
      salary: 30000,
      designation: "Photographer",
      id: 8
    },
    {
      name: "tribhuvan",
      email: "jigiy21163@luxiu2.com",
      salary: 35000,
      designation: "Civil Engineer",
      id: 9
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
})

const generateId = () => {
    const maxId = persons.length > 0 
        ? Math.max(...persons.map(p => p.id)) 
        : 0
    return maxId + 1
}

app.post('/api/persons', (req, res) => {
    const body = req.body;

    if(!body.name || !body.email || !body.salary || !body.designation){
        return res.status(400).json({ 
            error: 'content missing' 
          })
    }

    const person = {
        name: body.name,
        email: body.email,
        salary: body.salary,
        designation: body.designation,
        id: generateId()
    }

    persons = persons.concat(person)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    res.status(204).end()
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})