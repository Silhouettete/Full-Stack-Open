require("dotenv").config();
const mongoose = require("mongoose");

const Person = require("./models/person");

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI);

const persons = [
  {
    name: "Arto Hellas",
    phone: "040-123543",
    street: "Tapiolankatu 5 A",
    city: "Espoo",
  },
  {
    name: "Matti Luukkainen",
    phone: "040-432342",
    street: "Malminkaari 10 A",
    city: "Helsinki",
  },
  {
    name: "Venla Ruuska",
    street: "Nallemäentie 22 C",
    city: "Helsinki",
  },
];

const seed = async () => {
  try {
    await Person.deleteMany({}); // optional: clears DB first

    await Person.insertMany(persons);

    console.log("Data inserted!");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
  }
};

seed();
