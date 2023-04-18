import { useState, useEffect } from "react";
import axios from "axios";

const Country = (props) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${props.capital}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => setWeather(response.data))
      .catch((error) => console.log(error));
  }, []);
  if (!weather) {
    return null;
  }
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
      <img src={props.flag} alt={props.alt} />
      <h2>Weather in {weather.name} </h2>
      <p>temperature {weather.main.temp} celsius </p>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
      />
      <p>wind {weather.wind.speed} m/s </p>
    </>
  );
};

export default Country;
