import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [notification, setNotification] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // Load all countries once
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const matchingCountries = (event) => {
    const searchedCountry = event.target.value;
    setValue(searchedCountry);
    //explictly handle the error notification appearing after clearing the input
    if (searchedCountry === "") {
      setSelectedCountry(null);
      setFilteredCountries([]);
      setNotification(null);
      return;
    }
    //filter the countries matching the common name of the input
    const filtered = countries.filter(
      (country) =>
        country.name.common &&
        country.name.common
          .toLowerCase()
          .includes(searchedCountry.toLowerCase())
    );
    //handling the query not to be more than 10
    if (filtered.length >= 10) {
      setNotification({
        message: "Too many matches, trying specifying another filter",
      });
      setFilteredCountries([]);
    } else {
      setFilteredCountries(filtered);
      setNotification(null);
      if (filtered.length === 1) {
        setFilteredCountries([]);
        selectCountry(filtered[0]);
      }
    }
  };

  const selectCountry = (filtered) => {
    // //Find the matching country
    // const matchingCountry = countries.find(
    //   (country) => country.name.common.toLowerCase() === filtered.toLowerCase()
    // );
    // //If there is matching country
    // if (matchingCountry) {
    //Fetch the data of the country by the API

    axios
      .get(
        `https://studies.cs.helsinki.fi/restcountries/api/name/${filtered.name.common}`
      )
      .then((response) => {
        setSelectedCountry(response.data);
        console.log(response.data);
        console.log("fetches!");
        fetchWeatherData(filtered);
      });
    setFilteredCountries([]);
    //}
  };

  const Notification = ({ notification }) => {
    if (notification === null) {
      return null;
    }

    return (
      <div className={`notification ${notification.type}`}>
        {notification.message}
      </div>
    );
  };
  const fetchWeatherData = (country) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=4f2d01ddb119d556334fedf91211327e`
      )
      .then((response) => {
        setWeatherData(response.data);
        console.log(response.data.main.temp);
      });
  };
  return (
    <div>
      Find Countries: <input value={value} onChange={matchingCountries} />
      <Notification notification={notification} />
      <ul>
        {filteredCountries.map((c) => (
          <div key={c.cca3}>
            <li>{c.name.common}</li>
            <button onClick={() => selectCountry(c)}>Show</button>
          </div>
        ))}
      </ul>
      {selectedCountry && (
        <pre>
          {/* {JSON.stringify(selectedCountry, null, 2)}{" "} */}
          <h1>{selectedCountry.name.common}</h1>
          <h2>Capital {selectedCountry.capital}</h2>
          <h3>area {selectedCountry.area}</h3>
          <br></br>
          <h1>Languages</h1>
          <ul>
            {Object.values(selectedCountry.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img src={`${selectedCountry.flags.png}`} />
          <div>
            <h1>Weather in {selectedCountry.capital}</h1>
            {weatherData && (
              <div>
                <p>
                  Temperature {parseInt(weatherData.main.temp) - 273.15} Celsius
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                />
                <p>Wind {weatherData.wind.speed}</p>
              </div>
            )}
          </div>
        </pre>
      )}
    </div>
  );
};

export default App;
