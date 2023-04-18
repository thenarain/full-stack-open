import { useState, useEffect } from "react";
import axios from "axios";
import CountryShow from "./components/CountryShow";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!countries) {
    return countries;
  }

  const handleChange = (event) => {
    setValue(event.target.value);
    setData([]);
  };

  const dataToShow =
    value === ""
      ? []
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(value.toLowerCase())
        );

  const handleClick = (name) => {
    setData(dataToShow.filter((data) => data.name.common === name));
  };

  return (
    <>
      <div>
        find countries <input value={value} onChange={handleChange} />
      </div>
      <div>
        <CountryShow
          dataToShow={dataToShow}
          data={data}
          handleClick={(name) => handleClick(name)}
        />
      </div>
    </>
  );
};

export default App;
