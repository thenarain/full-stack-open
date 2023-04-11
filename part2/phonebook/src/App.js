import { useState, useEffect } from "react";
import axios from "axios"; 

const Person = (props) => {
  return (
    <p>
      {props.name} {props.number}
    </p>
  );
};

const Persons = (props) => {
  return (
    <div>
      {props.personToShow.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </div>
  );
};

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange} />
      </div>
      <div>
        number:{" "}
        <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type={props.type}>{props.text}</button>
      </div>
    </form>
  );
};

const Filter = (props) => {
  return (
    <div>
      filter shown with{" "}
      <input value={props.value} onChange={props.handleFilterChange} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    })
  }, [])

  const addName = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newobj = {
        name: newName,
        number: newNumber,
      };
      axios.post('http://localhost:3001/persons', newobj).
      then(response => setPersons(persons.concat(response.data)))
    }

    setNewName("");
    setNewNumber("");
  };

  const newNameChange = (event) => {
    setNewName(event.target.value);
  };

  const newNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const newFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const personToShow =
    newFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} handleFilterChange={newFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addName={addName}
        newName={newName}
        handleNameChange={newNameChange}
        newNumber={newNumber}
        handleNumberChange={newNumberChange}
        type="submit"
        text="add"
      />
      <h3>Numbers</h3>
      <Persons personToShow={personToShow} />
    </div>
  );
};

export default App;
