import React, { useContext } from 'react';
import { WeatherContext } from './WeatherProvider';

const CurrentWeather = () => {
  const { weatherData } = useContext(WeatherContext);

  if (!weatherData) return <p>Loading current weather...</p>;

  return (
    <div className="current-weather">
      <h2>Now</h2>
      <p>🌡️ {weatherData.the_temp.toFixed(1)}°C</p>
      <p>☁️ {weatherData.weather_state_name}</p>
    </div>
  );
};
export default CurrentWeather;