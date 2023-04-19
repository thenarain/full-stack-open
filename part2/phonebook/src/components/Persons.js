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
          key={person.id}
          name={person.name}
          number={person.number}
          deleteHandle={() => deleteHandle(person.id, person.name)}
        />
      ))}
    </div>
  );
};

export default Persons;
