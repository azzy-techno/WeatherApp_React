import React, { useContext } from 'react';
import { WeatherContext } from './WeatherProvider';
import ForecastCard from './ForecastCard';

const ForecastGrid = () => {
  const { forecast, isSlowConnection } = useContext(WeatherContext);

  if (!forecast.length) return <p>Loading forecast...</p>;

  return (
    <div className="forecast-grid">
      {forecast.map((day, index) => (
        <ForecastCard key={index} data={day} slow={isSlowConnection} />
      ))}
    </div>
  );
};

export default ForecastGrid;