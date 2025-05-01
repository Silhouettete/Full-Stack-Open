import { useState } from "react";

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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
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
