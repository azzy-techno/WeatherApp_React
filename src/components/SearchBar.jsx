import React, { useState, useContext } from 'react';
import { WeatherContext } from './WeatherProvider';

const citySuggestions = ["New York", "London", "Paris", "Tokyo", "Delhi", "Bangalore", "Dubai", "Sydney", "San Francisco", "Berlin"];

const SearchBar = () => {
  const [city, setCity] = useState("");
  const [filteredCities, setFilteredCities] = useState([]);
  const { fetchWeather, cityName } = useContext(WeatherContext);

  const handleInput = (e) => {
    const val = e.target.value;
    setCity(val);
    setFilteredCities(
      citySuggestions.filter((c) =>
        c.toLowerCase().startsWith(val.toLowerCase())
      )
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    }
  };

  const handleSelect = (val) => {
    setCity(val);
    setFilteredCities([]);
    fetchWeather(val);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInput}
        />
        <button type="submit">Search</button>
      </form>
      {filteredCities.length > 0 && (
        <ul className="autocomplete">
          {filteredCities.map((cityOption, index) => (
            <li key={index} onClick={() => handleSelect(cityOption)}>
              {cityOption}
            </li>
          ))}
        </ul>
      )}
      {cityName && <p className="city-name">📍 Showing weather for: <strong>{cityName}</strong></p>}
    </div>
  );
};

export default SearchBar;