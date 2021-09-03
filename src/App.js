import React, { useState } from "react";
import "./App.css";

const api = {
  key: "32fc2af3e4b989428937c7e9af7b0524",
  base: "http://api.weatherstack.com/current?access_key=",
};
const App = () => {
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState({ errorStatus: false, errorText: "" });

  const callApi = (keyPress) => {
    if (keyPress === "Enter") {
      fetch(`${api["base"]}${api["key"]}&query=${search}`)
        .then((body) => {
          return body.json();
        })
        .then((res) => {
          setSearch("");
          setWeather({});
          const objectKeys = Object.keys(res);
          if (objectKeys.includes("error")) {
            return setError({
              errorStatus: true,
              errorText: "Please enter a valid city name",
            });
          }
          setError({ errorStatus: false, errorText: "" });

          return setWeather(res);
        });
    }
  };

  const dateBuilder = (d) => {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };
  return (
    <div className="container hot">
      <main>
        <div className="search-box">
          <input
            className="search-bar"
            placeholder="Enter city name"
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
            onKeyPress={(e) => {
              callApi(e.key);
            }}
          />
        </div>
        {Object.keys(weather).length !== 0 ? (
          <div>
            <div className="location-box">
              <div className="location">{`${weather.location.name}, ${weather.location.country}`}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp"> {weather.current.temperature}&deg;C</div>
              <div className="weather">
                {weather.current.weather_descriptions[0]}
              </div>
            </div>
          </div>
        ) : null}
        {error["errorStatus"] === true ? (
          <div className="error-box">
            <h4 className="error">{error["errorText"]}</h4>
          </div>
        ) : null}
      </main>
    </div>
  );
};
export default App;
