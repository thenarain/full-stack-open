import Country from "./Country";

const Countries = (props) => {
  return (
    <div>
      {props.name}
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  );
};

const Message = (props) => {
  return <div>{props.message}</div>;
};
const CountryShow = (props) => {
  if (props.dataToShow.length > 1 && props.dataToShow.length <= 10) {
    if (props.data.length === 1) {
      return (
        <Country
          name={props.data[0].name.common}
          capital={props.data[0].capital}
          area={props.data[0].area}
          languages={props.data[0].languages}
          flag={props.data[0].flags.png}
          alt={props.data[0].alt}
        />
      );
    }
    return (
      <>
        {props.dataToShow.map((country) => (
          <Countries
            key={country.name.common}
            name={country.name.common}
            text="show"
            handleClick={() => props.handleClick(country.name.common)}
          />
        ))}
      </>
    );
  } else if (props.dataToShow.length > 10) {
    return <Message message="Too many matches, specify another filter" />;
  } else if (props.dataToShow.length === 1) {
    const [dataToShow] = props.dataToShow;
    return (
      <Country
        name={dataToShow.name.common}
        capital={dataToShow.capital}
        area={dataToShow.area}
        languages={dataToShow.languages}
        flag={dataToShow.flags.png}
        alt={dataToShow.flags.alt}
      />
    );
  }
};

export default CountryShow;
