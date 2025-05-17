require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Person = require("./models/person");

const app = express();

//Morgan
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :post")
);
morgan.token("post", function (req) {
  return req.method === "POST" ? JSON.stringify(req.body) : " ";
});

app.use(express.json());

let persons = [];

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);
app.use(express.static("dist"));
app.use(express.json());

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).end();
    });
});

app.delete(`/api/persons/:id`, (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  response.send(`<p>This phonebook has info for ${persons.length} people</p>
    <p> ${new Date()}</p>`);
});

app.post("/api/persons/", (request, response) => {
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({ error: "name missing" });
  }
  if (!body.number) {
    return response.status(400).json({ error: "number missing" });
  }
  // if (persons.find((person) => person.name === body.name)) {
  //   return response.status(400).json({ error: "name must be unique" });
  // }
  const person = new Person({
    name: body.name,
    number: body.number,
  });
  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});
app.put("/api/persons", (request, response, next) => {
  const { name, number } = request.body;

  if (!name || !number) {
    return response.status(400).json({ error: "name and number required" });
  }

  Person.findOneAndUpdate(
    { name: name },
    { number: number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      if (!updatedPerson) {
        return response.status(404).json({ error: "person not found" });
      }
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (request, response, next) => {
  console.error(error.message);
  if (error.name === "Cast Error") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};
app.use(errorHandler);
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
