import { useState, useEffect } from "react";
import PersonService from "./services/persons";

//Person form component
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

//input component for filtering the names
const Filter = ({ searchName, handleSearch }) => {
  return (
    <>
      filter shown with
      <input value={searchName} onChange={handleSearch} />
    </>
  );
};

//handle delete component
const Button = ({ name, id, handleDelete }) => {
  return (
    <button
      onClick={() => {
        if (window.confirm(`Delete ${name}?`)) {
          handleDelete(id);
        }
      }}
    >
      Delete
    </button>
  );
};

//Display persons, filtered persons
const Persons = ({ persons, filteredNames, handleDelete }) => {
  if (persons.length == 0) {
    return <div>There is no contact in your list. Start by adding one!</div>;
  }
  return (
    <ul>
      {filteredNames.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
          <Button
            id={person.id}
            name={person.name}
            handleDelete={handleDelete}
          />
          <pre id="log"></pre>
        </li>
      ))}
    </ul>
  );
};

//main component
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchName, setSearchName] = useState("");

  //Display all the person in the list by using useEffect hook
  useEffect(() => {
    PersonService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
    });
  }, []);
  //Add a new person by using HTTP POST
  const addPerson = (event) => {
    event.preventDefault();
    const alreadyAdded = persons.find((person) => person.name === newName);
    const newNameObject = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };
    if (alreadyAdded) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        PersonService.updatePersonList(alreadyAdded.id, newNameObject).then(
          //after the backend responds with the updated person, take and update the front state
          (returnedNewPerson) =>
            setPersons((persons) =>
              //loop through all current people
              persons.map((person) =>
                //if the id matches that of updated one
                person.id === returnedNewPerson.id
                  ? //replace
                    returnedNewPerson
                  : person
              )
            )
        );
        setNewName("");
        setNewNumber("");
      }
    } else {
      PersonService.createNewPerson(newNameObject).then((returnedNewPerson) =>
        setPersons(persons.concat(returnedNewPerson))
      );
      setNewName("");
      setNewNumber("");
    }
  };

  //Delete contact by using HTTP Delete
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this person?")) return;
    PersonService.deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting person:", error);
      });
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

  const filteredNames = persons.filter(
    (person) =>
      person.name &&
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
      <Persons
        persons={persons}
        filteredNames={filteredNames}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
