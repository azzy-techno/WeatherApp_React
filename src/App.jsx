import React from 'react';
import WeatherProvider from './components/WeatherProvider';
import CurrentWeather from './components/CurrentWeather';
import ForecastGrid from './components/ForecastGrid';
import SearchBar from './components/SearchBar';
import './styles/global.css';

const App = () => {
  return (
    <WeatherProvider>
      <div className="app">
        <h1>MyWeatherApp</h1>
        <SearchBar />
        <CurrentWeather />
        <h2>Upcoming Forecast</h2>
        <ForecastGrid />
      </div>
    </WeatherProvider>
  );
};

export default App;
