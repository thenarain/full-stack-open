import { useState, useEffect } from "react";
import contactService from "./services/contact";

const Person = (props) => {
  return (
    <p>
      {props.name} {props.number}
      <button onClick={props.deleteHandle}>delete</button>
    </p>
  );
};

const Persons = (props) => {
  const deleteHandle = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      contactService
        .remove(id)
        .then(() =>
          props.setPersons(
            props.personToShow.filter((person) => person.id !== id)
          )
        )
        .catch(() => {
          props.setPersons(
            props.personToShow.filter((person) => person.id !== id)
          );
          props.showError(name);
        });
    }
  };
  return (
    <div>
      {props.personToShow.map((person) => (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          deleteHandle={() => deleteHandle(person.id, person.name)}
        />
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

const Notification = (props) => {
  const messageStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    bordeRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (props.message === null) {
    return null;
  }
  return <div style={messageStyle}>{props.message}</div>;
};

const ErrorNotification = (props) => {
  const messageStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    bordeRadius: 5,
    padding: 10,
    marginBottom: 10,
  };
  if (props.message === null) {
    return null;
  }
  return <div style={messageStyle}>{props.message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [indicator, setIndicator] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    contactService
      .getAll()
      .then((initialContact) => setPersons(initialContact));
  }, []);

  const showNotification = () => {
    setIndicator(`Added ${newName}`);
    setTimeout(() => {
      setIndicator(null);
    }, 2000);
  };

  const showError = (name) => {
    setErrorMessage(
      `Information of ${name} has already been removed from server`
    );
    setTimeout(() => {
      setErrorMessage(null);
    }, 3000);
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
        .catch(() => {
          setPersons(persons.filter((person) => person.id !== newObj.id));
          showError(newObj.name);
        });
    } else {
      const newobj = {
        name: newName,
        number: newNumber,
      };
      contactService.create(newobj).then((returnedContact) => {
        setPersons(persons.concat(returnedContact));
        showNotification();
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
