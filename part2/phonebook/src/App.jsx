import { useState, useEffect } from "react";
import axios from "axios";
const PersonForm = ({
  addPerson,
  newName,
  handleNameSubmit,
  newNumber,
  handleNumberSubmit,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameSubmit} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberSubmit} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Filter = ({ searchName, handleSearch }) => {
  return (
    <>
      filter shown with
      <input value={searchName} onChange={handleSearch} />
    </>
  );
};

const Persons = ({ filteredNames }) => {
  return (
    <ul>
      {filteredNames.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");
  const addPerson = (event) => {
    event.preventDefault();
    const alreadyAdded = persons.some((person) => person.name === newName);
    if (alreadyAdded) {
      alert(`${newName} is already added`);
    } else {
      const newNameObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1),
      };
      setPersons(persons.concat(newNameObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNameSubmit = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberSubmit = (event) => {
    setNewNumber(event.target.value);
  };
  const handleSearch = (event) => {
    setSearchName(event.target.value);
  };
  const filteredNames = persons.filter((person) =>
    person.name.toLowerCase().includes(searchName.toLowerCase())
  );
  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };
  useEffect(hook, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearch={handleSearch} />
      <h2>Add a new one</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameSubmit={handleNameSubmit}
        handleNumberSubmit={handleNumberSubmit}
      />
      <h2>Numbers</h2>
      <Persons filteredNames={filteredNames} />
    </div>
  );
};

export default App;
