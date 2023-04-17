import { useState, useEffect } from "react";
import axios from "axios";
import CountryShow from "./components/CountryShow";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const dataToShow =
    value === ""
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(value.toLowerCase())
        );

  return (
    <>
      <div>
        find countries <input value={value} onChange={handleChange} />
      </div>
      <div>
        <CountryShow dataToShow={dataToShow} />
      </div>
    </>
  );
};

export default App;
