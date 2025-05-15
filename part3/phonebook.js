const express = require("express");
const app = express();
const { request } = require("http");
const morgan = require("morgan");
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :post")
);
morgan.token("post", function (req) {
  return req.method === "POST" ? JSON.stringify(req.body) : "";
});
app.use(express.json());
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons/", (request, response) => {
  response.json(persons);
  response.end(JSON.stringify(persons));
});

app.get(`/api/persons/:id`, (request, response) => {
  const id = request.params.id;
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete(`/api/persons/:id`, (request, response) => {
  const id = request.params.id;
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.get("/info", (request, response) => {
  response.send(`<p>This phonebook has info for ${persons.length} people</p>
    <p> ${new Date()}</p>`);
});

const generateID = () => {
  const id = persons.length > 0 ? Math.floor(Math.random() * 200) : 0;
  return String(id + 1);
};

app.post(`/api/persons/`, (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({ error: "name missing" });
  }
  if (!body.number) {
    return response.status(400).json({ error: "number missing" });
  }
  if (persons.find((person) => person.name === body.name)) {
    return response.status(400).json({ error: "name must be unique" });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateID(),
  };
  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
