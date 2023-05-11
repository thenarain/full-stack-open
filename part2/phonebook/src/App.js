import { useState, useEffect } from "react";
import contactService from "./components/services/contact";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import ErrorNotification from "./components/ErrorNotification";
import PersonForm from "./components/PersonForm";

const Filter = (props) => {
  return (
    <div>
      filter shown with{" "}
      <input value={props.value} onChange={props.handleFilterChange} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState(null);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [indicator, setIndicator] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    contactService
      .getAll()
      .then((initialContact) => setPersons(initialContact))
      .catch((error) => console.log(error));
  }, []);

  if (!persons) {
    return null;
  }

  const showNotification = () => {
    setIndicator(`Added ${newName}`);
    setTimeout(() => {
      setIndicator(null);
    }, 2000);
  };

  const showError = (error) => {
    setErrorMessage(error.response.data.error);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const addName = (event) => {
    event.preventDefault();

    if (
      persons.some((person) => person.name === newName) &&
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one ?`
      )
    ) {
      const contact = persons.find((person) => person.name === newName);
      const newObj = { ...contact, number: newNumber };
      contactService
        .update(newObj.id, newObj)
        .then((updatedValue) => {
          setPersons(
            persons.map((person) =>
              person.id !== newObj.id ? person : updatedValue
            )
          );
          showNotification();
        })
        .catch((error) => {
          showError(error)
        });
    } else {
      const newobj = {
        name: newName,
        number: newNumber,
      };
      contactService
        .create(newobj)
        .then((returnedContact) => {
          setPersons(persons.concat(returnedContact));
          showNotification();
        })
        .catch((error) => {
          showError(error)
        });
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
      <Notification message={indicator} />
      <ErrorNotification message={errorMessage} />
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
      <Persons
        personToShow={personToShow}
        setPersons={setPersons}
        showError={(name) => showError(name)}
      />
    </div>
  );
};

export default App;
