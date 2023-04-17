const Countries = (props) => {
  return <div>{props.name}</div>;
};

const Country = (props) => {
  const emojisStyle = {
    fontSize: 150,
  };
  const objtoArr = (object) => {
    return Object.values(object);
  };
  const langArray = objtoArr(props.languages);
  return (
    <>
      <h1>{props.name}</h1>
      <div>capital {props.capital}</div>
      <div>area {props.area}</div>
      <div>
        <h3>languages:</h3>
        <ul>
          {langArray.map((languague) => (
            <li key={languague}>{languague}</li>
          ))}
        </ul>
      </div>
      <div style={emojisStyle}>{props.flag}</div>
    </>
  );
};

const CountryShow = (props) => {
  if (props.dataToShow.length > 1 && props.dataToShow.length <= 10) {
    return (
      <>
        {props.dataToShow.map((country) => (
          <Countries key={country.name.common} name={country.name.common} />
        ))}
      </>
    );
  } else if (props.dataToShow.length > 10) {
    return <Countries name="Too many matches, specify another filter" />;
  } else if (props.dataToShow.length == 1) {
    const [dataToShow] = props.dataToShow;
    return (
      <Country
        name={dataToShow.name.common}
        capital={dataToShow.capital}
        area={dataToShow.area}
        languages={dataToShow.languages}
        flag={dataToShow.flag}
      />
    );
  }
};

export default CountryShow;
